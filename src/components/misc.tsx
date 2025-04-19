"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dicsordButtonVariants } from "./discord-card/button";

export function EditorButton() {
	const path = usePathname();
	if (path === "/editor") return null;
	return (
		<Link href="/editor" className={cn(dicsordButtonVariants())}>
			Editor
		</Link>
	);
}
