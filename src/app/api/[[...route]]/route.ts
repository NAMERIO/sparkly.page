import { Router as HonoApp } from "@/api/routes";
import { handle } from "hono/vercel";

export const GET = handle(HonoApp);
export const POST = handle(HonoApp);
