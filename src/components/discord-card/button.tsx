import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { UserPlusIcon } from "lucide-react";
import Link from "next/link";

const dicsordButtonVariants = cva(
	"fieldButton__1fed1 button__201d5 lookFilled__201d5 colorPrimary__201d5 sizeSmall__201d5 grow__201d5",
	{
		variants: {
			variant: {},
			size: {
				default: "h-10 px-4 py-2",
				xs: "rounded-sm text-xs py-1 px-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

export interface DiscordButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof dicsordButtonVariants> {
	asChild?: boolean;
}

const DiscordButton = React.forwardRef<HTMLButtonElement, DiscordButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(dicsordButtonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
DiscordButton.displayName = "Button";

export { DiscordButton, dicsordButtonVariants };

export function SignUpWithDiscordButton() {
	return (
		<Link
			href="/api/auth/discord"
			className="hover:bg-blue-500! bg-blue-600! text-blue-200! pinkshinyButton__6a443 button__201d5 lookFilled__201d5 colorGreen__201d5 sizeMedium__201d5 grow__201d5 premiumCta_fbfab6"
		>
			<div className="flex gap-2 contents__201d5 premiumSubscribeButton__29199">
				<UserPlusIcon className="size-4" />
				<span className="buttonText__29199">Sign In With Discord</span>
			</div>
		</Link>
	);
}
