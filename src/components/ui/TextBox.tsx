import React from "react";

import { cn } from "@/library/utils";

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	lableText?: string;
	error?: string;
	children?: React.ReactNode;
}

const TextBox = React.forwardRef<HTMLInputElement, TextBoxProps>(
	({ className, children, lableText, type = "text", error, ...props }, ref) => {
		return (
			<div className={cn("relative", className)}>
				{lableText && (
					<label
						className="block text-left text-slate-600 dark:text-slate-200 mb-2 text-xs lg:text-sm xl:text-base"
						htmlFor="txt">
						{lableText}
					</label>
				)}
				<div className="flex items-stretch">
					<input
						id="txt"
						autoComplete="off"
						className={`border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base bg-slate-50
                ${error && "border-red-500 border  animate-shake"} ${
							children ? "rounded-r-md" : "rounded-md"
						}`}
						{...props}
						ref={ref}
						type={type}></input>

					<div className="flex">{children}</div>
				</div>
				{error && <p className="text-red-600 text-right animate-shake">{error}</p>}
			</div>
		);
	}
);

TextBox.displayName = "TextBox";
export default TextBox;
