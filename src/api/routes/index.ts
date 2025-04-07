import { Hono } from "hono";
import { DiscordRouter } from "./auth/discord";
import { MockRouter } from "./auth/mock";
import { PublicRouter } from "./public";
import { UserRouter } from "./user";

export const Router = new Hono().basePath("/api");

Router.route("/", PublicRouter);
Router.route("/user/", UserRouter);

// Auth
Router.route("/auth/discord", DiscordRouter);
Router.route("/auth/mock", MockRouter);
