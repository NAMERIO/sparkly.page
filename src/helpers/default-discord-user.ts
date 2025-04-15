export const discordStatus = {
	online: {
		name: "online",
		color: "#40a258",
	},
	idle: {
		name: "idle",
		color: "#cc954c",
	},
	dnd: {
		name: "dnd",
		color: "#d83a42",
	},
	offline: {
		name: "offline",
		color: "#82838b",
	},
};

const accounts = [
	{
		name: "jrdsctt#1859",
		platform: "Battle.net",
		iconSrc: "/assets/163c8cb9220efc74.svg",
		profileUrl: null,
	},
	{
		name: "Jarid Scott Waniger",
		platform: "Spotify",
		iconSrc: "/assets/d5719388ffc613da.svg",
		profileUrl: "https://open.spotify.com/user/jrdsctt",
	},
	{
		name: "jrdsctt",
		platform: "X",
		iconSrc: "/assets/a61999ae9bfb9658.svg",
		profileUrl: "https://x.com/jrdsctt",
	},
	{
		name: "jrdsctt",
		platform: "Reddit",
		iconSrc: "/assets/adfd927dcc2049a5.svg",
		profileUrl: "https://www.reddit.com/u/jrdsctt",
	},
	{
		name: "jrdsctt",
		platform: "Steam",
		iconSrc: "/assets/1f7ec18f3695d4cf.svg",
		profileUrl: "https://steamcommunity.com/profiles/76561197982559154",
	},
];

type DefaultDiscordUser = typeof defaultDiscordUser;

export const defaultDiscordUser = {
	displayName: "preacher",
	username: "061252661321235107",
	status: discordStatus.idle,
	avatar: "",
	description: "I am a preacher",
	memberSince: "Aug 15, 2023",
	accounts,
	roles: [
		{
			id: "1284243292019626046",
			name: "Servr boosts",
			color: "rgb(244, 127, 255)",
			icon: "https://cdn.discordapp.com/role-icons/1284243292019626046/aa6c9e02cab17192ade4b3454c545e1f.webp?size=20&quality=lossless",
		},
		{
			id: "1279788469752696883",
			name: "Survevrs (level 5)",
			color: "rgb(221, 180, 16)",
			icon: "https://cdn.discordapp.com/role-icons/1279788469752696883/ff9f5b60d851aa50fc0e6e72cfce57da.webp?size=20&quality=lossless",
		},
		{
			id: "1306918227925794897",
			name: "Community Membrs",
			color: "rgb(196, 201, 206)",
			icon: undefined,
		},
	],
};
