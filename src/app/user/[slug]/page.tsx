import { UserCard } from "@/components/user-card";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from 'next'
import { redirect } from "next/navigation";

export const revalidate = 0;

type Props = {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata(
	{ params }: Props,
): Promise<Metadata> {
	const { slug } = await params;

	const data = await db.query.usersTable.findFirst({
		where: eq(usersTable.username, slug),
		columns: {
			displayName: true,
		},
	});

	if (!data) return {
		title: "User doesn't exist",
	}

	const title = `${data.displayName}'s Profile`

	return {
		title,
	}
};

export default async function Page({
	params,
}: Props) {
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
			<UserCard user={data} />
		</div>
	);
}
