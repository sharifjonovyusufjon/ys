import crypto from "crypto";

export type TelegramLoginPayload = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

const ALLOWED = (process.env.ADMIN_TELEGRAM_USERNAME || "sharifjonovyusufjon").replace(/^@/, "").toLowerCase();

const asString = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
};

export const readTelegramPayload = (body: unknown): TelegramLoginPayload | null => {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  const id = Number(data.id);
  const authDate = Number(data.auth_date);
  const hash = asString(data.hash);
  if (!Number.isInteger(id) || id <= 0 || !Number.isInteger(authDate) || !/^[a-f0-9]{64}$/i.test(hash)) {
    return null;
  }
  return {
    id,
    first_name: asString(data.first_name) || undefined,
    last_name: asString(data.last_name) || undefined,
    username: asString(data.username).replace(/^@/, "") || undefined,
    photo_url: asString(data.photo_url) || undefined,
    auth_date: authDate,
    hash,
  };
};

export const verifyTelegramLogin = (payload: TelegramLoginPayload): boolean => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return false;
  const username = (payload.username || "").toLowerCase();
  if (username !== ALLOWED) return false;
  const age = Math.floor(Date.now() / 1000) - payload.auth_date;
  if (age < 0 || age > 15 * 60) return false;

  const check = Object.entries(payload)
    .filter(([key, value]) => key !== "hash" && value !== undefined && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secret = crypto.createHash("sha256").update(token).digest();
  const digest = crypto.createHmac("sha256", secret).update(check).digest("hex");
  const left = Buffer.from(digest, "hex");
  const right = Buffer.from(payload.hash, "hex");
  return left.length === right.length && crypto.timingSafeEqual(left, right);
};
