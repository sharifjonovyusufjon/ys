import type { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookie } from "@/libs/auth";
import { readTelegramPayload, verifyTelegramLogin } from "@/libs/telegram-auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const payload = readTelegramPayload(req.body);
  if (!payload || !verifyTelegramLogin(payload)) {
    res.status(401).json({ ok: false });
    return;
  }
  setAuthCookie(req, res);
  res.status(200).json({ ok: true });
}
