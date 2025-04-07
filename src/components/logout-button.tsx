"use client";

export function LogoutButton() {
	return (
		<button
			className="underline underline-offset-4"
			onClick={async () => {
				await fetch("/api/user/logout", {
					method: "POST",
				});
				window.location.reload();
			}}
		>
			Logout
		</button>
	);
}
