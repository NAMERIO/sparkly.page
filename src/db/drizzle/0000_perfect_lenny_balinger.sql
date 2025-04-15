CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"display_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'online' NOT NULL,
	"avatar" text DEFAULT 'https://cdn.discordapp.com/avatars/1140994582209904640/217657ddc4fcdfd2245a47844ff0d302.webp?size=160' NOT NULL,
	"roles" json DEFAULT '[{"id":"1279788469752696883","name":"Survevrs (level 5)","color":"rgb(221, 180, 16)","icon":"https://cdn.discordapp.com/role-icons/1279788469752696883/ff9f5b60d851aa50fc0e6e72cfce57da.webp?size=20&quality=lossless"},{"id":"1306918227925794897","name":"Community Membrs","color":"rgb(196, 201, 206)"}]'::json NOT NULL,
	"links" json DEFAULT '[]'::json NOT NULL,
	"banned_color" text DEFAULT '#4b8b8b' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;