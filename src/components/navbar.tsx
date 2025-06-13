import { SignUpWithDiscordButton } from "@/components/discord-card/button";
import { LogoutButton } from "@/components/logout-button";
import { Config } from "@/config";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { Suspense } from "react";
import { EditorButton } from "./misc";

export async function Navbar({
	user,
}: { user?: Awaited<ReturnType<typeof validateRequest>> | null }) {
	const { isAuthenticated } = user ?? { isAuthenticated: false};

	return (
		<nav className="mx-auto px-2 py-4 flex justify-between items-center font-gooper!  border-b-2 mb-10">
			<Link href="/" className="text-white! text-xl">
        sparkly.page<span className="text-xs text-muted font-hanken-grotesk">{" "}[beta]</span>
			</Link>
				<ul className="flex items-center gap-2">
					<li className="flex justify-between items-center gap-2">
						{isAuthenticated ? (
							<>
								<EditorButton />
								<LogoutButton />
							</>
						) : (
							<SignUpWithDiscordButton />
						)}
					</li>
					<li>
						{!isAuthenticated && Config.mockAuthEnabled && (
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
	);
}
