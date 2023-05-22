import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/library/utils";

export const buttonVariants = cva(
	"active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transiton-color disabled:opacity-50 disabled:pointer-events-none ",
	{
		variants: {
			variant: {
				default:
					"bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100",
				green: "bg-green-500 text-white hover:bg-green-400 dark:bg-green-500 dark:text-white dark:hover:bg-green-400",
				outline:
					"bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100 border border-slate-200 hover:bg-slate-100 dark:hover:border-slate-700",
				ghost: "bg-transparent hover:bg-white dark:hover:bg-slate-800 dark:text-slate-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
				link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
			},
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-2 rounded-md",
				lg: "h-11 px-8 rounded-md",
			},
			active: {
				default: "hover:bg-slate-100",
				on: "bg-white dark:bg-slate-800 text-blue-500 dark:text-blue-400",
				off: "hover:bg-slate-100",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, isLoading, size, active, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, active, className }))}
				ref={ref}
				disabled={isLoading}
				{...props}>
				{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;
