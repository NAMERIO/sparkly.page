// "use client";
// import { Button } from "@/components/ui/button";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { minDelay } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { LoaderIcon } from "lucide-react";
// import type React from "react";
// import { useEffect, useState } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import type { z } from "zod";
// import { type Action, type State, formSchema } from "./wrapper";


// type Status = keyof typeof STATUS_MAP;

// export function EditForm({
// 	state,
// 	dispatch,
// }: { state: State; dispatch: React.Dispatch<Action> }) {
// 	const [isLoading, setIsLoading] = useState(false);
// 	const form = useForm<z.infer<typeof formSchema>>({
// 		resolver: zodResolver(formSchema),
// 		defaultValues: {
// 			displayName: state.displayName!,
// 			description: state.description!,
// 			status: state.status!,
// 			links: state.links!,
// 		},
// 	});

// 	const { fields, append, remove } = useFieldArray({
// 		control: form.control,
// 		name: "links",
// 	});

// 	form.watch("links");

// 	useEffect(() => {
// 		const subscription = form.watch((value, { name, type }) => {
// 			if (name === "status") {
// 				dispatch({ type: "UPDATE_STATUS", value: value.status! as Status });
// 				return;
// 			}

// 			if (name === "displayName") {
// 				dispatch({
// 					type: "UPDATE_displayName",
// 					value: value.displayName!,
// 				});
// 				return;
// 			}

// 			if (name === "description") {
// 				dispatch({
// 					type: "UPDATE_DESCRIPTION",
// 					value: value.description!,
// 				});
// 				return;
// 			}

// 			if (name?.startsWith("links")) {
// 				dispatch({
// 					type: "UPDATE_LINKS",
// 					value: value.links!,
// 				});
// 			}
// 		});
// 		return () => subscription.unsubscribe();
// 	}, [form.watch]);

// 	async function onSubmit(values: z.infer<typeof formSchema>) {
// 		setIsLoading(true);

// 		await minDelay(
// 			fetch("/api/user/update-data", {
// 				method: "POST",
// 				body: JSON.stringify(state),
// 			})
// 				.then((res) => res.json())
// 				.then(console.log),
// 			700,
// 		);

// 		setIsLoading(false);
// 	};

// 	return (
// 		<div className="flex-1 flex flex-col">
// 			<Form {...form}>
// 				<form
// 					className="flex-1 flex flex-col"
// 					onSubmit={form.handleSubmit(onSubmit)}
// 				>
// 					<FormField
// 						control={form.control}
// 						name="displayName"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel className="text-xs font-bold text-(--header-secondary) mb-2">
// 									DISPLAY NAME
// 								</FormLabel>
// 								<FormControl>
// 									<Input
// 										variant="discord"
// 										placeholder="dispay name"
// 										{...field}
// 									/>
// 								</FormControl>
// 								{/* <FormDescription>
//                   This is your public display name.
//                 </FormDescription> */}
// 								<FormMessage className="text-red-300" />
// 							</FormItem>
// 						)}
// 					/>
// 					<FormField
// 						control={form.control}
// 						name="description"
// 						render={({ field }) => (
// 							<FormItem className="my-3">
// 								<FormLabel className="text-xs font-bold text-(--header-secondary)">
// 									ABOUT ME
// 								</FormLabel>
// 								<FormControl>
// 									<Textarea
// 										variant="discord"
// 										{...field}
// 										// maxLength={DESCRIPTION_MAX_LENGTH}
// 									/>
// 								</FormControl>
// 								{/* <FormDescription>
//                   You can use markdown and links if you'd like.
//                 </FormDescription> */}
// 								<FormMessage className="text-red-300"></FormMessage>
// 							</FormItem>
// 						)}
// 					/>
// 					<FormField
// 						control={form.control}
// 						name="status"
// 						render={({ field }) => (
// 							<FormItem className="my-3">
// 								<FormLabel className="text-xs font-bold text-(--header-secondary) ">
// 									STATUS
// 								</FormLabel>
								
// 								{/* <FormDescription>
//                   You can manage email addresses in your
//                 </FormDescription> */}
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>
// 					<Button
// 						className="mt-auto text-(--white-500) bg-(--button-positive-background) hover:bg-(--button-positive-background-hover) rounded-sm w-full px-4 font-bold text-xs"
// 						disabled={isLoading}
// 						type="submit"
// 					>
// 						{isLoading && (
// 							<LoaderIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
// 						)}
// 						Publish
// 					</Button>
// 				</form>
// 			</Form>
// 			{/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
// 		</div>
// 	);
// }
