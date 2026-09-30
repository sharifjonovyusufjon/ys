import mongoose, { Schema } from "mongoose";
import { cloneContent } from "@/libs/fallback";
import type { SiteContent } from "@/libs/types";

const L10n = { ko: String, en: String, uz: String };

const profileSchema = new Schema(
  {
    key: { type: String, default: "site" },
    name: String,
    email: String,
    phone: String,
    phoneTel: String,
    portrait: String,
    location: L10n,
    visa: L10n,
    eyebrow: L10n,
    headline: L10n,
    description: L10n,
    meta: L10n,
    availability: L10n,
    footerLead: L10n,
    bio: L10n,
    highlights: [String],
    koreanTitle: L10n,
    koreanProgram: L10n,
    koreanNote: L10n,
    koreanLevel: Number,
    koreanTotal: Number,
  },
  { collection: "profile" },
);

const socialSchema = new Schema(
  { label: String, href: String, order: Number },
  { collection: "socials" },
);

const projectSchema = new Schema(
  { title: L10n, link: String, image: String, order: Number },
  { collection: "projects" },
);

const experienceSchema = new Schema(
  {
    start: String,
    end: String,
    role: L10n,
    company: L10n,
    color: String,
    bg: String,
    order: Number,
  },
  { collection: "experiences" },
);

const techSchema = new Schema(
  {
    title: L10n,
    order: Number,
    items: [{ name: L10n, icon: String, color: String }],
  },
  { collection: "techgroups" },
);

const postSchema = new Schema(
  {
    slug: { type: String, unique: true },
    title: L10n,
    excerpt: L10n,
    body: L10n,
    cover: String,
    published: Boolean,
    createdAt: String,
    order: Number,
  },
  { collection: "posts" },
);

const model = (name: string, schema: Schema) => mongoose.models[name] || mongoose.model(name, schema);

export const Profile = model("Profile", profileSchema);
export const Social = model("Social", socialSchema);
export const Project = model("Project", projectSchema);
export const Experience = model("Experience", experienceSchema);
export const TechGroup = model("TechGroup", techSchema);
export const Post = model("Post", postSchema);

const globalCache = global as typeof global & { mongooseConn?: Promise<typeof mongoose> };

export async function connectDb(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing");
  if (!globalCache.mongooseConn) {
    globalCache.mongooseConn = mongoose.connect(uri);
  }
  return globalCache.mongooseConn;
}

const plain = <T>(doc: { toObject?: () => T } | T): T => {
  const value =
    doc && typeof doc === "object" && "toObject" in doc && doc.toObject
      ? doc.toObject()
      : doc;
  const copy = JSON.parse(JSON.stringify(value)) as T & { _id?: unknown; __v?: unknown };
  if (copy && typeof copy === "object") {
    if ("_id" in copy) copy._id = String(copy._id);
    delete copy.__v;
  }
  return copy;
};

export async function ensureSeed(): Promise<void> {
  await connectDb();
  const extras = await Profile.find({ key: "site" }).sort({ _id: 1 }).skip(1).select("_id");
  if (extras.length) {
    await Profile.deleteMany({ _id: { $in: extras.map((doc) => doc._id) } });
  }
  try {
    await Profile.collection.createIndex({ key: 1 }, { unique: true });
  } catch {
    // Duplicate rows or an index build already in progress.
  }
  const seed = cloneContent();
  let inserted = false;
  try {
    const result = await Profile.updateOne(
      { key: "site" },
      { $setOnInsert: { key: "site", ...seed.profile } },
      { upsert: true },
    );
    inserted = result.upsertedCount === 1;
  } catch (error) {
    if ((error as { code?: number }).code === 11000) return;
    throw error;
  }
  if (!inserted) return;
  if (seed.socials.length) await Social.insertMany(seed.socials);
  if (seed.projects.length) await Project.insertMany(seed.projects);
  if (seed.experiences.length) await Experience.insertMany(seed.experiences);
  if (seed.techGroups.length) await TechGroup.insertMany(seed.techGroups);
  if (seed.posts.length) await Post.insertMany(seed.posts);
}

export async function loadContent(includeDrafts = false): Promise<SiteContent> {
  await ensureSeed();
  const [profile, socials, projects, experiences, techGroups, posts] = await Promise.all([
    Profile.findOne({ key: "site" }).lean(),
    Social.find().sort({ order: 1 }).lean(),
    Project.find().sort({ order: 1 }).lean(),
    Experience.find().sort({ order: 1 }).lean(),
    TechGroup.find().sort({ order: 1 }).lean(),
    Post.find(includeDrafts ? {} : { published: true }).sort({ order: 1, createdAt: -1 }).lean(),
  ]);
  const fallback = cloneContent();
  const profileData = profile ? (plain(profile) as SiteContent["profile"] & { key?: string; _id?: string }) : null;
  if (profileData) {
    delete profileData._id;
    delete profileData.key;
  }
  return {
    profile: profileData ? { ...fallback.profile, ...profileData } : fallback.profile,
    socials: socials.map((item) => plain(item)),
    projects: projects.map((item) => plain(item)),
    experiences: experiences.map((item) => plain(item)),
    techGroups: techGroups.map((item) => plain(item)),
    posts: posts.map((item) => plain(item)),
  };
}
