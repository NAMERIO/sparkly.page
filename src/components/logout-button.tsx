"use client";

import { DiscordButton } from "./discord-card/button";

export function LogoutButton() {
	return (
		<DiscordButton
			onClick={async () => {
				await fetch("/api/user/logout", {
					method: "POST",
				});
				window.location.reload();
			}}
		>
			Logout
		</DiscordButton>
	);
}
