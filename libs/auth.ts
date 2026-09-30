import crypto from "crypto";
import type { IncomingMessage } from "http";
import type { NextApiRequest, NextApiResponse } from "next";

const COOKIE = "ys_admin";

const secret = (): string => process.env.ADMIN_SECRET || "dev-secret";

export const adminToken = (): string =>
  crypto.createHmac("sha256", secret()).update("ys-admin").digest("hex");

export const readCookie = (header: string | undefined): string => {
  if (!header) return "";
  const part = header.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${COOKIE}=`));
  return part ? decodeURIComponent(part.slice(COOKIE.length + 1)) : "";
};

export const isAuthed = (req: IncomingMessage | NextApiRequest): boolean =>
  readCookie(req.headers.cookie) === adminToken();

export const setAuthCookie = (req: NextApiRequest, res: NextApiResponse): void => {
  const proto = req.headers["x-forwarded-proto"];
  const secure = proto === "https" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=${adminToken()}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800${secure}`,
  );
};

export const clearAuthCookie = (res: NextApiResponse): void => {
  res.setHeader("Set-Cookie", `${COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
};

export const requireAdmin = (req: NextApiRequest, res: NextApiResponse): boolean => {
  if (isAuthed(req)) return true;
  res.status(401).json({ ok: false });
  return false;
};
