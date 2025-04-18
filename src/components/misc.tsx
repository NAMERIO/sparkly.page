"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

export function EditorButton() {
	const path = usePathname();
	if (path === "/editor") return null;
	return (
		<Link
			href="/editor"
			className={cn(buttonVariants(), "text-white! font-gooper! ")}
		>
			Editor
		</Link>
	);
}
