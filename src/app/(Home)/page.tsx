import { LogoutButton } from "@/components/logout-button";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
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

					<div className="bg-red-100 p-5">
						<p className="p-5">
							It starts with your name. See if yours is available:
						</p>
						<div>
							<input type="text" placeholder="@username" />
							<button>Claim</button>
						</div>
						<div>(Type something above and we’ll see if it’s available.)</div>
					</div>
				</div>
			</header>
		</>
	);
}
