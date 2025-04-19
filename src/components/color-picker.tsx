"use client";
import { HexColorPicker } from "react-colorful";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useCallback, useRef, useState } from "react";

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
