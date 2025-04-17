import { LogoutButton } from "@/components/logout-button";
import { Config } from "@/config";
import type { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { EditorButton } from "./misc";

export function Navbar({ user }: { user: Awaited<ReturnType<typeof validateRequest>> | null }) {
    const { isAuthenticated } = user ?? { isAuthenticated: false };
    
    return (
        <nav className="mx-auto p-2 flex justify-between items-center font-gooper!">
        <Link href="/" className="text-white! text-xl">sparkly.page</Link>
        <ul className="flex items-center gap-2">
            <li className="flex justify-between items-center gap-2">
                {isAuthenticated ? (
                    <>
                        <EditorButton />
                        <LogoutButton />
                    </>
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
    )
}