import { Navbar } from "@/components/navbar";
import { validateRequest } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Wrapper } from "./_components/wrapper";

export const metadata: Metadata = {
	title: "editor",
};

export default async function Page() {
	const user = await validateRequest();

	if (!user.isAuthenticated) {
		redirect("/");
	}

	return (
		<>
			<div>
				<Navbar user={user} />
			</div>
			<Wrapper user={user.user!} isPreview={false} />
		</>
	);
}
