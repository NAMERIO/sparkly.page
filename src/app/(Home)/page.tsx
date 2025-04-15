import { LogoutButton } from "@/components/logout-button";
import { validateRequest } from "@/lib/auth";
import { ReactQueryProvider } from "@/providers/react-query";
import Link from "next/link";
import UsernameCheckCard from "./_components/UsernameCheckCard";

export default async function Home() {
	// return <UserCard />;
	const { isAuthenticated } = await validateRequest();
	return (
		<>
			<header className="max-w-screen-lg mx-auto p-2 ">
				<nav className="py-2 flex justify-between items-center font-gooper">
					<Link href="/">sparkly.page</Link>
					<ul>
						<li>
							{isAuthenticated ? (
								<LogoutButton />
							) : (
								<Link
									href="/api/auth/discord"
									className="underline underline-offset-4"
								>
									Sign In With Discord
								</Link>
							)}
						</li>
					</ul>
				</nav>
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
