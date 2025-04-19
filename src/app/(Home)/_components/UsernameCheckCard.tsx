"use client";

import { SignUpWithDiscordButton } from "@/components/discord-card/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function UsernameCheckCard() {
	const [username, setUsername] = useState<string>("");
	const { isPending, data, isFetching, refetch } = useQuery({
		enabled: false,

		queryKey: ["check-username"],
		queryFn: () =>
			fetch("/api/check-username", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username }),
			}).then((res) => res.json()),
	});

	useEffect(() => {
		if (data?.message) {
			data.message = null;
		}
	}, [username]);

	return (
		<div className="bg-(--background-secondary-alt) p-4 font-hanken-grotesk">
			<p className="text-lg">
				First things first—your name. Is it up for grabs?
			</p>
			<div className="py-4 flex gap-2 items-center max-w-fit w-full mx-auto">
				<Input
					variant="discord"
					maxLength={20}
					type="text"
					placeholder="@username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				{data?.message ? (
					<div>
						<SignUpWithDiscordButton />
					</div>
				) : (
					<Button
						variant="discord"
						onClick={() => {
							if (isFetching) return;
							refetch();
						}}
					>
						Claim
					</Button>
				)}
			</div>

			<div className=" pb-4">
				{isFetching
					? "Checking..."
					: isPending
						? "Type something above and we’ll see if it’s available."
						: data?.message}
			</div>
		</div>
	);
}
