import { buttonVariants } from "@/components/ui/button";
import { UserCard } from "@/components/user-card";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 0;

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	const data = await db.query.usersTable.findFirst({
		where: eq(usersTable.username, slug),
		columns: {
			displayName: true,
		},
	});

	if (!data)
		return {
			title: "User doesn't exist",
		};

	const title = `${data.displayName}'s Profile`;

	return {
		title,
	};
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const data = await db.query.usersTable.findFirst({
		where: eq(usersTable.username, slug),
		columns: {
			id: true,
			username: true,
			displayName: true,
			description: true,
			status: true,
			links: true,
			avatar: true,
			bannedColor: true,
			createdAt: true,
			roles: true,
		},
	});

	if (!data) redirect("/404");

	return (
		<div>
			<div className="py-10">
				<UserCard user={data} />
			</div>
			<div className="pb-10 flex justify-center">
				<a
					href={`/api/create_your_own_page?userId=${data.id}`}
					className={cn(
						"text-white!",
						buttonVariants({ variant: "discord_muted", size: "sm" }),
					)}
				>
					create your own ✨ sparkly.page
				</a>
			</div>
		</div>
	);
}
