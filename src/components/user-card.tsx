import { SvgMasks } from "@/components/svg-masks";
import type { UsersTableSelect } from "@/db/schema";
import { discordStatus } from "@/helpers/default-discord-user";
import { Roles } from "./discord-card/roles";

export function UserCard({
	user,
	reactiveUserData,
}: { user: UsersTableSelect; reactiveUserData?: Partial<UsersTableSelect> }) {
	user = { ...user, ...(reactiveUserData ?? {}) };
	const status = discordStatus[user.status];
	return (
		<>
			<SvgMasks />
			<div
				aria-label="User Profile Modal"
				className="flex flex-col items-center py-10!"
			>
				<div
					className="root__24502 r  oot__49fc1 small__49fc1 fullscreenOnMobile__49fc1"
					style={
						{
							opacity: "1",
							transform: "scale(1)",
							"--font-display": "var(--font-hanken-grotesk)",
							"--font-primary": "var(--font-hanken-grotesk)",
						} as React.CSSProperties
					}
				>
					<div
						className="outer_c0bea0 theme-dark theme-midnight images-dark fullSize_c0bea0"
						style={
							{
								"--profile-avatar-border-color":
									"var(--background-secondary-alt)",
								"--profile-body-background-color": "var(--background-floating)",
								"--profile-body-background-hover":
									"var(--background-modifier-hover)",
								"--profile-body-border-color": "var(--border-faint)",
								"--profile-body-divider-color":
									"var(--background-modifier-accent)",
								"--profile-gradient-button-color":
									"var(--button-secondary-background)",
								"--profile-gradient-overlay-color": "rgba(0, 0, 0, 0)",
								"--profile-gradient-primary-color":
									"var(--background-secondary-alt)",
								"--profile-gradient-secondary-color":
									"var(--background-secondary-alt)",
								"--profile-message-input-border-color":
									"var(--background-modifier-accent)",
								"--profile-note-background-color": "var(--background-tertiary)",
								"--profile-role-pill-background-color":
									"var(--background-secondary-alt)",
								"--profile-role-pill-border-color": "var(--interactive-normal)",
							} as React.CSSProperties
						}
					>
						<div className="inner_c0bea0 fullSize_c0bea0">
							<header>
								<svg
									className="mask__68edb"
									style={{
										minHeight: "210px",
										minWidth: "600px",
									}}
									viewBox="0 0 600 210"
								>
									<mask id="uid_2167">
										<rect fill="white" height="100%" width="100%" x="0" y="0" />
										<circle cx="84" cy="205" fill="black" r="68" />
									</mask>
									<foreignObject
										height="100%"
										mask="url(#uid_2167)"
										overflow="visible"
										width="100%"
										x="0"
										y="0"
									>
										<div
											className="banner__68edb"
											style={{
												backgroundColor: "rgb(211, 211, 211)",
												height: "210px",
												minHeight: "210px",
											}}
										/>
									</foreignObject>
								</svg>
								<div className="headerInner__24502">
									<div className="avatar__75742 fullSize__75742">
										<div className="avatar__75742 fullSize__75742 withReactReply__75742">
											<div
												aria-hidden="false"
												aria-label="lcsgames, Do Not Disturb"
												className="wrapper__44b0c"
												role="img"
												style={{
													height: "120px",
													width: "120px",
												}}
											>
												<svg
													aria-hidden="true"
													className="mask__44b0c svg__44b0c"
													height="138"
													viewBox="0 0 138 138"
													width="138"
												>
													<foreignObject
														height="120"
														mask="url(#svg-mask-avatar-status-round-120)"
														width="120"
														x="0"
														y="0"
													>
														<div className="avatarStack__44b0c">
															<img
																alt=" "
																aria-hidden="true"
																className="avatar__44b0c"
																src={user.avatar}
															/>
														</div>
													</foreignObject>
													<rect
														className="pointerEvents__44b0c"
														fill={status.color}
														height="24"
														mask={`url(#svg-mask-status-${status.name})`}
														width="24"
														x="88"
														y="88"
													/>
												</svg>
												<span
													style={{
														display: "none",
													}}
												/>
											</div>
										</div>
									</div>
									<span
										style={{
											display: "none",
										}}
									/>
									<ThinkingText text={"so what?"} />
									<span
										style={{
											display: "none",
										}}
									/>
									<div className="headerButtons__24502">
										<div className="multipleButtons_ea99c4">
											<div>
												<button
													aria-label="Message"
													className="button_fb7f94 icon_fb7f94 button__201d5 lookFilled__201d5 colorPrimary__201d5 themeColor_fb7f94 primary_fb7f94"
													type="button"
												>
													<div className="contents__201d5 buttonInner_fb7f94 icon_fb7f94">
														<svg
															aria-hidden="true"
															fill="none"
															height="16"
															role="img"
															viewBox="0 0 24 24"
															width="16"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																className=""
																d="M12 22a10 10 0 1 0-8.45-4.64c.13.19.11.44-.04.61l-2.06 2.37A1 1 0 0 0 2.2 22H12Z"
																fill="currentColor"
															/>
														</svg>
													</div>
												</button>
											</div>
											<span
												style={{
													display: "none",
												}}
											/>
											<button
												aria-label="Add Friend"
												className="button_fb7f94 button__201d5 lookFilled__201d5 colorBrand__201d5 themeColor_fb7f94 primary_fb7f94 sizeSmall__201d5 grow__201d5"
												type="button"
											>
												<div className="contents__201d5 buttonInner_fb7f94">
													<svg
														aria-hidden="true"
														fill="none"
														height="16"
														role="img"
														viewBox="0 0 24 24"
														width="16"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															className=""
															d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z"
															fill="currentColor"
														/>
														<path
															className=""
															d="M16.83 12.93c.26-.27.26-.75-.08-.92A9.5 9.5 0 0 0 12.47 11h-.94A9.53 9.53 0 0 0 2 20.53c0 .81.66 1.47 1.47 1.47h.22c.24 0 .44-.17.5-.4.29-1.12.84-2.17 1.32-2.91.14-.21.43-.1.4.15l-.26 2.61c-.02.3.2.55.5.55h7.64c.12 0 .17-.31.06-.36C12.82 21.14 12 20.22 12 19a3 3 0 0 1 3-3h.5a.5.5 0 0 0 .5-.5V15c0-.8.31-1.53.83-2.07ZM12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
															fill="currentColor"
														/>
													</svg>
													Add Friend
												</div>
											</button>
										</div>
									</div>
								</div>
							</header>
							<div className="body__24502">
								<div className="container__63ed3">
									<div className="usernameRow__63ed3">
										<h1
											className="defaultColor__4bd52 heading-xl/bold_cf4812 defaultColor__5345c nickname__63ed3 fullSize__63ed3"
											data-text-variant="heading-xl/bold"
										>
											{user.displayName}
										</h1>
										<div className="nicknameIcons__63ed3 fullSize__63ed3">
											<div
												aria-label="Unable to load profile banner, badges, and about me."
												className="container__23ba6"
											>
												<svg
													aria-hidden="true"
													fill="none"
													height="16"
													role="img"
													viewBox="0 0 24 24"
													width="16"
													xmlns="http://www.w3.org/2000/svg"
												>
													<circle
														className=""
														cx="12"
														cy="12"
														fill="transparent"
														r="10"
													/>
													<path
														className=""
														clipRule="evenodd"
														d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm1.44-15.94L13.06 14a1.06 1.06 0 0 1-2.12 0l-.38-6.94a1 1 0 0 1 1-1.06h.88a1 1 0 0 1 1 1.06Zm-.19 10.69a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
														fill="var(--status-warning)"
														fillRule="evenodd"
													/>
												</svg>
											</div>
											<span
												style={{
													display: "none",
												}}
											/>
										</div>
									</div>
									<div className="tags__63ed3 fullSize__63ed3">
										<div className="info_f4bc97 userTag__63ed3">
											<span className="userTagUsername__63ed3">
												{user.username}
											</span>
											<span
												style={{
													display: "none",
												}}
											/>
										</div>
									</div>
								</div>
								<div className="overlay_c0bea0 fullSize_c0bea0 overlay__24502">
									<div className="container_d1d9f3">
										<div
											aria-orientation="horizontal"
											className="tabBar_d1d9f3 top_b3f026"
											role="tablist"
										>
											<div
												aria-controls="user_info-tab"
												aria-disabled="false"
												aria-label="About Me"
												aria-selected="true"
												className="tabBarItem_d1d9f3 item_b3f026 selected_b3f026 themed_b3f026"
											>
												<div
													className="defaultColor__4bd52 text-sm/normal_cf4812"
													data-text-variant="text-sm/normal"
												>
													About Me
												</div>
											</div>
										</div>

										<div
											className="scroller_fcb628 thin_d125d2 scrollerBase_d125d2 fade_d125d2"
											dir="ltr"
											style={{
												overflow: "hidden scroll",
												paddingRight: "8px",
											}}
										>
											<div className="markup__75297">
												<div
													className="defaultColor__4bd52 text-sm/normal_cf4812"
													data-text-variant="text-sm/normal"
												>
													<span>{user.description}</span>
												</div>
											</div>
											<section className="section_bf424d">
												<div className="headings_bf424d">
													<div className="header_bf424d">
														<h1
															className="text-xs/semibold_cf4812 defaultColor__5345c"
															data-text-variant="text-xs/semibold"
															style={{
																color: "var(--header-secondary)",
															}}
														>
															Roles
														</h1>
													</div>
												</div>
												<Roles roles={user.roles} />
											</section>
											<section className="section_bf424d">
												<div className="headings_bf424d">
													<div className="header_bf424d">
														<h1
															className="text-xs/semibold_cf4812 defaultColor__5345c"
															data-text-variant="text-xs/semibold"
															style={{
																color: "var(--header-secondary)",
															}}
														>
															Member Since
														</h1>
													</div>
												</div>
												<div className="memberSinceWrapper_c4eb81">
													<div className="memberSince_c4eb81">
														<svg
															aria-hidden="false"
															aria-label="Discord"
															className="discordIcon_c4eb81"
															fill="none"
															height="28"
															role="img"
															viewBox="0 0 24 24"
															width="28"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																className=""
																d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.25-3.4-.25-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 0 0 .96 17.7a18.43 18.43 0 0 0 5.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.32-.24.47-.37 3.58 1.7 7.7 1.7 11.28 0l.46.37c-.6.36-1.25.67-1.9.92.35.7.75 1.35 1.2 1.98 2.03-.63 3.94-1.6 5.64-2.87.47-4.87-.78-9.09-3.3-12.83ZM8.3 15.12c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.89 2.27-2 2.27Zm7.4 0c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.88 2.27-2 2.27Z"
																fill="currentColor"
															/>
														</svg>
														<span
															style={{
																display: "none",
															}}
														/>
														<div
															className="defaultColor__4bd52 text-sm/normal_cf4812"
															data-text-variant="text-sm/normal"
														>
															{new Date(user.createdAt).toLocaleDateString()}
														</div>
													</div>
													{/* <div className="divider_c4eb81" />
	  <div className="memberSince_c4eb81">
		<div
		  aria-label="Midjourney"
		  className="icon_f34534 iconSizeSmol_f34534 iconInactive_f34534"
		  role="button"
		  style={{
			backgroundImage:
			  'url("https://cdn.discordapp.com/icons/662267976984297473/39128f6c9fc33f4c95a27d4c601ad7db.webp?size=20")',
		  }}
		  tabIndex={0}
		/>
		<span
		  style={{
			display: "none",
		  }}
		/>
		<div
		  className="defaultColor__4bd52 text-sm/normal_cf4812"
		  data-text-variant="text-sm/normal">
		  Mar 3, 2023
		</div>
	  </div>   */}
												</div>
											</section>
											<section className="section_bf424d">
												<div className="headings_bf424d">
													<div className="header_bf424d">
														<h1
															className="text-xs/semibold_cf4812 defaultColor__5345c"
															data-text-variant="text-xs/semibold"
															style={{
																color: "var(--header-secondary)",
															}}
														>
															Connections
														</h1>
													</div>
												</div>
												<Connections links={user.links} />
											</section>
											<section className="section_bf424d">
												<div className="headings_bf424d">
													<div className="header_bf424d">
														<h1
															className="text-xs/semibold_cf4812 defaultColor__5345c"
															data-text-variant="text-xs/semibold"
															style={{
																color: "var(--header-secondary)",
															}}
														>
															Note (only visible to you)
														</h1>
													</div>
												</div>
												<div className="note_fcb628">
													<textarea
														aria-label="Note"
														autoCorrect="off"
														className="textarea__9daae inputDefault__0f084 input__0f084 scrollbarGhostHairline__506b3 scrollbar__506b3"
														maxLength={256}
														placeholder="Click to add a note"
														style={{
															height: "45.6px",
														}}
													/>
												</div>
											</section>
											<div
												aria-hidden="true"
												style={{
													flex: "0 0 auto",
													height: "16px",
													minHeight: "0px",
													minWidth: "1px",
													pointerEvents: "none",
													position: "absolute",
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function ThinkingText({
	text,
}: {
	text: string;
}) {
	return (
		<div
			aria-label={`Custom status: ${text}`}
			className="container_ab8609 fullSize_ab8609"
		>
			<div className="outer_ab8609 fullSize_ab8609">
				<span className="inner_ab8609">
					<div
						className="content_ab8609"
						style={{
							maxHeight: "37.25px",
						}}
					>
						<img
							alt="Lucaspffft"
							aria-label=":Lucaspffft:"
							className="emoji emoji_c9d15c statusEmoji_ab8609"
							data-id="1298575255073329152"
							data-type="emoji"
							draggable="false"
							src="https://cdn.discordapp.com/emojis/1298575255073329152.webp?size=56"
						/>
						<div
							className="defaultColor__4bd52 text-sm/normal_cf4812 statusText_ab8609"
							data-text-variant="text-sm/normal"
						>
							{text}
						</div>
					</div>
				</span>
			</div>
		</div>
	);
}
export interface Link {
	id: string;
	name: string;
	iconSrc: string;
	profileUrl: string | null;
}

export function getIconSrcFromUrl(url: string | null) {
	if (!url) return "";

	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname;

		switch (true) {
			case /(?:^|\.)spotify\.com$/.test(hostname):
				return "/assets/d5719388ffc613da.svg";
			case /(?:^|\.)x\.com$/.test(hostname):
				return "/assets/a61999ae9bfb9658.svg";
			case /(?:^|\.)reddit\.com$/.test(hostname):
				return "/assets/adfd927dcc2049a5.svg";
			case /(?:^|\.)steamcommunity\.com$/.test(hostname):
				return "/assets/1f7ec18f3695d4cf.svg";
			case /(?:^|\.)battle\.net$/.test(hostname):
				return "/assets/163c8cb9220efc74.svg";
			case /(?:^|\.)instagram\.com$/.test(hostname):
				return "/assets/c05dded52023ed43.svg";
			default:
				return "";
		}
	} catch (e) {
		return "";
	}
}
function Connections({
	links,
}: {
	links: Link[];
}) {
	const midpoint = Math.ceil(links.length / 2);
	const firstColumnAccounts = links.slice(0, midpoint);
	const secondColumnAccounts = links.slice(midpoint);

	const renderAccount = (account: Link) => {
		return (
			<div className="connectedAccountContainer_e6abe8" key={account.id}>
				<div className="connectedAccount_e6abe8">
					<img
						alt="Wesbite Logo"
						className="connectedAccountIcon_e6abe8"
						src={getIconSrcFromUrl(account.profileUrl!)}
					/>
					<span
						style={{
							display: "none",
						}}
					/>
					<div className="connectedAccountNameContainer_e6abe8">
						<div className="connectedAccountName_e6abe8">
							<div className="connectedAccountNameTextContainer_e6abe8">
								<div
									aria-label={account.name}
									className="text-sm/medium_cf4812 connectedAccountNameText_e6abe8"
									data-text-variant="text-sm/medium"
									style={{
										color: "var(--interactive-active)",
									}}
								>
									{account.name}
								</div>
								<span
									style={{
										display: "none",
									}}
								/>
								<div
									className="flowerStarContainer__3e3b0 connectedAccountVerifiedIcon_e6abe8"
									style={{
										height: "16px",
										width: "16px",
									}}
								>
									<svg
										aria-hidden="false"
										aria-label="Verified Connection"
										className="flowerStar__3e3b0"
										height="16"
										role="img"
										viewBox="0 0 16 15.2"
										width="16"
									>
										<path
											d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"
											fill="hsla(227, 8.3%, 32.9%, 1)"
											fillRule="evenodd"
										/>
									</svg>
									<div className="childContainer__3e3b0 redesignIconChildContainer__3e3b0">
										<svg
											aria-hidden="true"
											fill="none"
											height="16"
											role="img"
											viewBox="0 0 24 24"
											width="16"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												className=""
												clipRule="evenodd"
												d="M18.7 7.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.29 7.3-7.3a1 1 0 0 1 1.4 0Z"
												fill="#e3e3e6"
												fillRule="evenodd"
											/>
										</svg>
									</div>
								</div>
								<span
									style={{
										display: "none",
									}}
								/>
							</div>
							{account.profileUrl && (
								<a
									className="anchor_edefb8 anchorUnderlineOnHover_edefb8"
									href={account.profileUrl}
									rel="noreferrer noopener"
									role="button"
									tabIndex={0}
									target="_blank"
								>
									<svg
										aria-hidden="true"
										className="connectedAccountOpenIcon_e6abe8 right_caab99"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
									>
										<polygon
											fill="currentColor"
											fillRule="nonzero"
											points="13 20 11 20 11 8 5.5 13.5 4.08 12.08 12 4.16 19.92 12.08 18.5 13.5 13 8"
										/>
									</svg>
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="connectedAccounts_e6abe8 connections_fcb628">
			<div className="connectedAccountsColumn_e6abe8">
				{firstColumnAccounts.map(renderAccount)}
			</div>
			<div className="connectedAccountsColumn_e6abe8">
				{secondColumnAccounts.map(renderAccount)}
			</div>
		</div>
	);
}
