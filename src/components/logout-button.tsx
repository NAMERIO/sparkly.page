"use client";

import { Button } from "./ui/button";

export function LogoutButton() {
	return (
		<Button
			variant="discord_muted"
			className="text-white! font-gooper! "
			onClick={async () => {
				await fetch("/api/user/logout", {
					method: "POST",
				});
				window.location.reload();
			}}
		>
			Logout
		</Button>
	);
}
