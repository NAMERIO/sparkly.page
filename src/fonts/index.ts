import { Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";

export const hankenGrotesk = Hanken_Grotesk({
	variable: "--font-hanken-grotesk",
	subsets: ["latin"],
});

export const gooper = localFont({
	src: [
		{
			path: "./GooperSemiCondensed7-Light.woff",
			weight: "300",
			style: "normal",
		},
		{
			path: "./GooperSemiCondensed7-Regular.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "./GooperSemiCondensed7-SemiBold.woff",
			weight: "600",
			style: "normal",
		},
	],
	variable: "--font-gooper",
});
