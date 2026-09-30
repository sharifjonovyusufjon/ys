import type { NextApiRequest, NextApiResponse } from "next";
import { clearAuthCookie } from "@/libs/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  clearAuthCookie(res);
  res.status(200).json({ ok: true });
}
