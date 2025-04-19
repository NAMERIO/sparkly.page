import { SignUpWithDiscordButton } from "@/components/discord-card/button";
import { Navbar } from "@/components/navbar";
import type { UsersTableSelect } from "@/db/schema";
import { ReactQueryProvider } from "@/providers/react-query";
import type { Metadata } from "next";
import { Wrapper } from "../editor/_components/wrapper";
import UsernameCheckCard from "./_components/UsernameCheckCard";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "sparkly.page",
	description: "Your discord profile card is unique, share it with the world!",
};

const MOCK_USER = {
	avatar: "",
	bannedColor: "",
	createdAt: new Date(),
	description: "such description such wow",
	displayName: "user#0001",
	id: "10000000",
	links: [
		{
			id: "2",
			name: "such link such wow",
			iconSrc: "/assets/d5719388ffc613da.svg",
			profileUrl: "https://open.spotify.com/",
		},
	],
	roles: [
	{
		id: "1279788469752696883",
		name: "such role such wow",
		color: "rgb(221, 180, 16)",
	},
	],
	status: "online",
	username: "something",
} as UsersTableSelect;

export default async function Home() {
  const user = await validateRequest();
  if ( user.isAuthenticated) {
    return redirect("/editor");
  }
	return (
		<div className="mb-10">
			<header className="max-w-screen-lg mx-auto p-2">
				<Navbar user={user} />
				<div className="my-10 text-center">
					<h1 className="text-4xl my-10 font-semibold font-gooper">
						Your discord profile card is unique,
						<br />
						share it with the world!
					</h1>
					<ReactQueryProvider>
						<UsernameCheckCard />
					</ReactQueryProvider>
				</div>
			</header>
			<div className="my-20">
				<div className="text-4xl text-center mb-10 font-bold font-gooper">
					See it. Edit it. Share it.
				</div>
				<Wrapper user={MOCK_USER} isPreview={true} />
			</div>
			<div className="my-20 pb-10">
				<div className="bg-blue-200 text-blue-700 w-full max-w-screen-sm font-semibold text-xl p-8 mx-auto rounded">
					<div className="text-4xl text-center mb-10 font-bold font-gooper text-blue-800">
						Like What You See?
					</div>
					Go ahead—make your own! It’s quick, easy, and totally yours to
					customize. No pressure, but if you’re even a little curious, hit that
					sign-up button. We already like you—and we think you’ll like it here.
					<div className="flex justify-center mt-20">
						<SignUpWithDiscordButton />
					</div>
				</div>
				<div></div>
			</div>
			<footer className="py-20">
				<div className="flex justify-center">
					<img
						className="size-20"
						src="https://cdn3.emoji.gg/emojis/67984-jellyseal.gif"
					/>
				</div>
			</footer>
		</div>
	);
}
