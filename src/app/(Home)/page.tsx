import { LogoutButton } from "@/components/logout-button";
import { validateRequest } from "@/lib/auth";
import { ReactQueryProvider } from "@/providers/react-query";
import Link from "next/link";
import UsernameCheckCard from "./_components/UsernameCheckCard";
import { Config } from "@/config";

export default async function Home() {
	// return <UserCard />;
	const { isAuthenticated } = await validateRequest();
	return (
		<>
			<header className="max-w-screen-lg mx-auto p-2 ">
				<nav className="py-2 flex justify-between items-center font-gooper">
					<Link href="/">sparkly.page</Link>
					<ul className="flex items-center gap-2">
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
						<li>
						{(!isAuthenticated && Config.mockAuthEnabled)  &&(
								<Link
									href="/api/auth/mock"
									className="underline underline-offset-4"
								>
									Mock Auth
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
