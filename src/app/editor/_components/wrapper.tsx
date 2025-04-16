"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserCard } from "@/components/user-card";
import type { UsersTableSelect } from "@/db/schema";
import { discordStatus } from "@/helpers/default-discord-user";
import { cn, generateId, minDelay } from "@/lib/utils";
import type { AnyFieldApi, Updater } from "@tanstack/react-form";
import { useForm, useStore } from "@tanstack/react-form";
import { ArrowUpRightIcon, LoaderIcon, PlusIcon, XIcon } from "lucide-react";
import { Fragment, useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { useClickOutside } from "@/hooks/useClickOutside";

export const PopoverPicker = ({
	color,
	onChange,
}: {
	color: string;
	onChange: (color: string) => void;
}) => {
	const popover = useRef<HTMLDivElement>(null);
	const [isOpen, toggle] = useState(false);

	const close = useCallback(() => toggle(false), []);
	useClickOutside(popover, close);

	return (
		<div className="relative">
			<div
				className="size-6.5 rounded-full shadow border-2"
				style={{ backgroundColor: color }}
				onClick={() => toggle(true)}
			/>

			{isOpen && (
				<div
					className="absolute rounded-full shadow-lg top-[calc(100%+4px)] z-10"
					ref={popover}
				>
					<HexColorPicker color={color} onChange={onChange} />
				</div>
			)}
		</div>
	);
};

const DESCRIPTION_MAX_LENGTH = 450;

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<em>{field.state.meta.errors.join(", ")}</em>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}

const STATUS_MAP = {
	online: "Active",
	idle: "Idle",
	dnd: "Do Not Disturb",
	offline: "Inactive",
};

export function Wrapper({ user }: { user: UsersTableSelect }) {
	const { displayName, description, status, links, roles, username } = user;

	const form = useForm({
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

	const store = useStore(form.store, (state) => ({ ...state.values }));
	return (
		<div className="font-hanken-grotesk grid lg:grid-cols-2 gap-2">
			<div className="flex-1 px-2 w-full max-w-[600px] mx-auto"> 
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
				<div>
					<form
						className="font-hanken-grotesk"
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<div className="my-2">
							<form.Field
								name="displayName"
								validators={{
									onChange: ({ value }) =>
										!value
											? "A first name is required"
											: value.length < 3
												? "First name must be at least 3 characters"
												: undefined,
								}}
								children={(field) => {
									return (
										<>
											<label
												className="mb-2 inline-block font-seminbold"
												htmlFor={field.name}
											>
												Display Name
											</label>
											<Input
												variant="discord"
												placeholder="dispay name"
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											<FieldInfo field={field} />
										</>
									);
								}}
							/>
						</div>
						<div className="my-2">
							<form.Field
								name="description"
								asyncAlways={true}
								children={(field) => {
									return (
										<>
											<label
												className="mb-2 inline-block font-seminbold"
												htmlFor={field.name}
											>
												About Me
											</label>
											<Textarea
												variant="discord"
												placeholder="Description"
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												maxLength={DESCRIPTION_MAX_LENGTH}
											/>
											<FieldInfo field={field} />
										</>
									);
								}}
							/>
						</div>
						<form.Field
							name="status"
							children={(field) => (
								<div>
									<label className="mb-2 inline-block font-seminbold">
										Status
									</label>
									<Select
										value={field.state.value}
										onValueChange={(v) =>
											field.handleChange(
												v as Updater<"online" | "idle" | "dnd" | "offline">,
											)
										}
									>
										<SelectTrigger className="bg-(--input-background) text-white border-none">
											<SelectValue placeholder="Select a status" />
										</SelectTrigger>
										<SelectContent className="bg-(--input-background) text-white  border-none">
											{Object.entries(STATUS_MAP).map(
												([key, statusDisplay]) => (
													<SelectItem
														key={key}
														value={key}
														className="capitalize border-current
                          focus:bg-(--background-modifier-hover) 
                          focus:text-white flex items-center justify-between gap-5"
													>
														<div className="flex items-center justify-center gap-5">
															<svg>
																<rect
																	className="pointerEvents__44b0c"
																	fill={
																		discordStatus[
																			key as keyof typeof discordStatus
																		]!.color
																	}
																	mask={`url(#svg-mask-status-${key})`}
																	width="90%"
																	height="90%"
																	x="0"
																	y="0"
																/>
															</svg>
														</div>
														{statusDisplay}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
								</div>
							)}
						/>
						<form.Field name="roles" mode="array">
							{(field) => {
								return (
									<div className="my-2">
										<div className="mb-2 font-seminbold flex items-center gap-2">
											<div> Roles </div>
											{field.state.value.length < 4 && (
												<div>
													<button
														type="button"
														onClick={() => {
															field.pushValue({
																id: generateId(8),
																name: "new link",
																color: "#fff",
																icon: "",
															});
														}}
														className="w-fit flex items-center justify-center gap-2 text-(--text-primary) bg-(--background-floating) rounded-sm text-xs py-1 px-2 my-2 w-full font-bold"
													>
														<PlusIcon className="size-4" />
														Add
													</button>
												</div>
											)}
										</div>
										<div className="grid grid-cols-2 justify-between">
											{field.state.value.map(({ id }, i) => {
												return (
													<div className="flex gap-2 items-center" key={id}>
														<form.Field name={`roles[${i}].color`}>
															{(subField) => {
																return (
																	<PopoverPicker
																		color={subField.state.value}
																		onChange={subField.handleChange}
																	/>
																);
															}}
														</form.Field>
														<form.Field name={`roles[${i}].name`}>
															{(subField) => {
																return (
																	<label className="flex items-center justify-between gap-2 py-2">
																		<Input
																			variant="discord"
																			placeholder="dispay name"
																			id={field.name}
																			name={field.name}
																			value={subField.state.value}
																			onChange={(e) =>
																				subField.handleChange(e.target.value)
																			}
																		/>
																	</label>
																);
															}}
														</form.Field>
														<button
															onClick={() => field.removeValue(i)}
															className=" hover:text-(--info-danger-foreground) text-(--interactive-normal) bg-(--primary-630) rounded-full flex justify-center items-center size-9"
														>
															<XIcon className="size-4" />
														</button>
													</div>
												);
											})}
										</div>
									</div>
								);
							}}
						</form.Field>
						<form.Field name="links" mode="array">
							{(field) => {
								return (
									<div className="my-2">
										<div className="mb-2 font-seminbold flex items-center gap-2">
											<div> Links </div>{" "}
											{field.state.value.length < 4 && (
												<div>
													<button
														onClick={() => {
															if (field.state.value.length >= 4) return;
															field.pushValue({
																id: generateId(8),
																name: "new link",
																profileUrl: "https://example.com",
																iconSrc: "",
															});
														}}
														className="w-fit flex items-center justify-center gap-2 text-(--text-primary) bg-(--background-floating) rounded-sm text-xs py-1 px-2 my-2 w-full font-bold"
													>
														<PlusIcon className="size-4" />
														Add
													</button>
												</div>
											)}
										</div>
										{field.state.value.map(({ id }, i) => {
											return (
												<Fragment key={id}>
													<form.Field name={`links[${i}].name`}>
														{(subField) => {
															return (
																<div>
																	<label className="flex items-center justify-between gap-2 py-2">
																		<span className="text-xs">{i + 1}.</span>
																		<Input
																			variant="discord"
																			placeholder="dispay name"
																			id={field.name}
																			name={field.name}
																			value={subField.state.value}
																			onChange={(e) =>
																				subField.handleChange(e.target.value)
																			}
																		/>
																		<button
																			onClick={() => field.removeValue(i)}
																			className=" hover:text-(--info-danger-foreground) text-(--interactive-normal) bg-(--primary-630) rounded-full flex justify-center items-center size-9"
																		>
																			<XIcon className="size-4" />
																		</button>
																	</label>
																</div>
															);
														}}
													</form.Field>
													<form.Field name={`links[${i}].profileUrl`}>
														{(subField) => {
															return (
																<div>
																	<label>
																		<Input
																			variant="discord"
																			placeholder="dispay name"
																			id={field.name}
																			name={field.name}
																			value={subField.state.value!}
																			onChange={(e) =>
																				subField.handleChange(e.target.value)
																			}
																		/>
																	</label>
																</div>
															);
														}}
													</form.Field>
												</Fragment>
											);
										})}
									</div>
								);
							}}
						</form.Field>
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									className="mt-auto text-(--white-500) bg-(--button-positive-background) hover:bg-(--button-positive-background-hover) rounded-sm w-full px-4 font-bold text-xs"
									disabled={!canSubmit}
									type="submit"
								>
									{isSubmitting && (
										<LoaderIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
									)}
									Publish
								</Button>
							)}
						/>
					</form>
				</div>
			</div>
			<div className="flex flex-col flex-1">
				<UserCard user={user} reactiveUserData={store} />
			</div>
		</div>
	);
}
