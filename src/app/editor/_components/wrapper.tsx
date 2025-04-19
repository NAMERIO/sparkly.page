"use client";

import type { UserRole } from "@/components/discord-card/roles";
import { buttonVariants } from "@/components/ui/button";
import { type DiscordLink, UserCard } from "@/components/user-card";
import type { UsersTableSelect } from "@/db/schema";
import { cn, minDelay } from "@/lib/utils";
import { formOptions, useStore } from "@tanstack/react-form";
import { ArrowUpRightIcon } from "lucide-react";
import { editForm, useAppForm } from "./edit-form";

export function Wrapper({
	user,
	isPreview,
}: { user: UsersTableSelect; isPreview: boolean }) {
	const { displayName, description, status, links, roles, username } = user;

	const options = formOptions({
		defaultValues: {
			displayName,
			description,
			status,
			links,
			roles,
		},
		onSubmit: async ({ value }) => {
			await minDelay(
				fetch("/api/user/update-data", {
					method: "POST",
					body: JSON.stringify(value),
				})
					.then((res) => res.json())
					.then(console.log),
				700,
			);
		},
	});

	const form = useAppForm({
		...options,
	});

	const store = useStore(form.store, (state) => ({ ...state.values }));

	return (
		<div className="font-hanken-grotesk grid lg:grid-cols-2 gap-2 w-auto">
			<div className="flex-1 px-2 max-w-[600px] w-full mx-auto">
				{!isPreview && (
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-lg font-semibold md:text-2xl text-(--text-normal)">
							Edit
						</h2>
						<a
							target="_blank"
							href={`/user/${username}`}
							className={cn(
								"flex gap-2 items-center",
								buttonVariants({ variant: "discord_muted", size: "xs" }),
							)}
							rel="noreferrer"
						>
							Preview <ArrowUpRightIcon className="h-4 w-4" />
						</a>
					</div>
				)}
				<div>{editForm({ options, isPreview })({ form })}</div>
			</div>
			<div className="flex flex-col flex-1">
				<UserCard user={user} reactiveUserData={store} />
			</div>
		</div>
	);
}

export function PreviewWrapper() {
	const MOCK_USER = {
		avatar: "",
		bannedColor: "",
		createdAt: new Date(),
		description: "",
		displayName: "something",
		id: "10000000",
		links: [] as DiscordLink[],
		roles: [] as UserRole[],
		status: "online",
		username: "something",
	} as UsersTableSelect;
	const { displayName, description, status, links, roles, username } =
		MOCK_USER;

	const options = formOptions({
		defaultValues: {
			displayName,
			description,
			status,
			links,
			roles,
		},
		onSubmit: async ({ value }) => {
			await minDelay(
				fetch("/api/user/update-data", {
					method: "POST",
					body: JSON.stringify(value),
				})
					.then((res) => res.json())
					.then(console.log),
				700,
			);
		},
	});
	const isPreview = true;
	const form = useAppForm({
		...options,
	});
	const store = useStore(form.store, (state) => ({ ...state.values }));

	return (
		<div className="font-hanken-grotesk grid lg:grid-cols-2 gap-2 w-auto">
			<div className="flex-1 px-2 max-w-[600px] w-full mx-auto">
				{!isPreview && (
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-lg font-semibold md:text-2xl text-(--text-normal)">
							Edit
						</h2>
						<a
							target="_blank"
							href={`/user/${username}`}
							className={cn(
								"flex gap-2 items-center",
								buttonVariants({ variant: "discord_muted", size: "xs" }),
							)}
							rel="noreferrer"
						>
							Preview <ArrowUpRightIcon className="h-4 w-4" />
						</a>
					</div>
				)}
				<div>{editForm({ options, isPreview })({ form })}</div>
			</div>
			<div className="flex flex-col flex-1">
				<UserCard user={MOCK_USER} reactiveUserData={store} />
			</div>
		</div>
	);
}
