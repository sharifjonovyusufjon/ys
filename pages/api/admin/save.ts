import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "@/libs/auth";
import {
  Experience,
  Post,
  Profile,
  Project,
  Social,
  TechGroup,
  connectDb,
  loadContent,
} from "@/libs/db";

export const config = { api: { bodyParser: { sizeLimit: "2mb" } } };

type Kind = "profile" | "socials" | "projects" | "experiences" | "techGroups" | "posts";

const strip = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(strip);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      if (key === "_id" || key === "__v" || key === "key") continue;
      out[key] = strip(item);
    }
    return out;
  }
  return value;
};

const asList = (value: unknown): Record<string, unknown>[] =>
  Array.isArray(value) ? (value.map(strip) as Record<string, unknown>[]) : [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  if (!requireAdmin(req, res)) return;

  try {
    await connectDb();
  } catch {
    res.status(500).json({ ok: false });
    return;
  }

  const kind = req.body?.kind as Kind;
  const data = req.body?.data;

  try {
    if (kind === "profile" && data && typeof data === "object" && !Array.isArray(data)) {
      const next = strip(data) as Record<string, unknown>;
      await Profile.findOneAndUpdate({ key: "site" }, { ...next, key: "site" }, { upsert: true });
    } else if (kind === "socials") {
      const items = asList(data).map((item, order) => ({
        label: String(item.label ?? ""),
        href: String(item.href ?? ""),
        order,
      }));
      await Social.deleteMany({});
      if (items.length) await Social.insertMany(items);
    } else if (kind === "projects") {
      const items = asList(data).map((item, order) => ({
        title: item.title,
        link: String(item.link ?? ""),
        image: String(item.image ?? ""),
        order,
      }));
      await Project.deleteMany({});
      if (items.length) await Project.insertMany(items);
    } else if (kind === "experiences") {
      const items = asList(data).map((item, order) => ({
        start: String(item.start ?? ""),
        end: String(item.end ?? ""),
        role: item.role,
        company: item.company,
        color: String(item.color ?? "#1a1916"),
        bg: String(item.bg ?? "#f4f1eb"),
        order,
      }));
      await Experience.deleteMany({});
      if (items.length) await Experience.insertMany(items);
    } else if (kind === "techGroups") {
      const items = asList(data).map((item, order) => ({
        title: item.title,
        items: item.items,
        order,
      }));
      await TechGroup.deleteMany({});
      if (items.length) await TechGroup.insertMany(items);
    } else if (kind === "posts") {
      const items = asList(data).map((item, order) => ({
        slug: String(item.slug ?? "")
          .trim()
          .toLowerCase(),
        title: item.title,
        excerpt: item.excerpt,
        body: item.body,
        cover: String(item.cover ?? ""),
        published: Boolean(item.published),
        createdAt: String(item.createdAt || new Date().toISOString()),
        order,
      }));
      if (items.some((item) => !item.slug)) {
        res.status(400).json({ ok: false, error: "slug" });
        return;
      }
      const slugs = new Set(items.map((item) => item.slug));
      if (slugs.size !== items.length) {
        res.status(400).json({ ok: false, error: "slug" });
        return;
      }
      await Post.deleteMany({});
      if (items.length) await Post.insertMany(items);
    } else {
      res.status(400).json({ ok: false });
      return;
    }

    const content = await loadContent(true);
    res.status(200).json({ ok: true, content });
  } catch {
    res.status(500).json({ ok: false });
  }
}
