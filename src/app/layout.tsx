import { gooper, hankenGrotesk } from "@/fonts";
import "./globals.css";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="theme-dark">
			<body
				className={`${gooper.variable} ${hankenGrotesk.variable} antialiased bg-(--background-secondary) text-(--text-primary) min-h-screen overflow-auto!`}
				style={{
					overflow: "auto",
				}}
			>
				{children}
			</body>
		</html>
	);
}
