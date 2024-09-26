import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classNames: (string | undefined | false | null)[]): string {
	return twMerge(clsx(...classNames));
}