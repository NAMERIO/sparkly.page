"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

	return (
		<div className="bg-(--background-secondary-alt) p-5 font-hanken-grotesk">
			<p className="">It starts with your name. See if yours is available:</p>
			<div className="p-5 flex gap-2 items-center max-w-xs w-full mx-auto">
				<Input
					variant="discord"
					maxLength={20}
					type="text"
					placeholder="@username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Button
					variant="discord"
					onClick={() => {
						if (isFetching) return;
						refetch();
					}}
				>
					Claim
				</Button>
			</div>

			<div>
				{isFetching
					? "Checking..."
					: isPending
						? "Type something above and we’ll see if it’s available."
						: data?.message}
			</div>
		</div>
	);
}
