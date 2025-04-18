import { Navbar } from "@/components/navbar";
import { validateRequest } from "@/lib/auth";
import { ReactQueryProvider } from "@/providers/react-query";
import type { Metadata } from "next";
import UsernameCheckCard from "./_components/UsernameCheckCard";

export const metadata: Metadata = {
	title: "sparkly.page ✨",
	description: "Your discord profile card is unique, share it with the world!",
};

export default async function Home() {
	const user = await validateRequest();

	return (
		<>
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
		</>
	);
}
