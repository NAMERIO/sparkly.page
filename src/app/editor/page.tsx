import { validateRequest } from "@/lib/auth";
import { Wrapper } from "./_components/wrapper";
import { Navbar } from "@/components/navbar";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "editor ✨",
};

export default async function Page() {
	const user = await validateRequest();

	if (!user.isAuthenticated) {
		redirect("/");
	}

	return <>
	<div>
		<Navbar user={user} />
	</div>
	<Wrapper user={user.user!} />
	</>;
}
