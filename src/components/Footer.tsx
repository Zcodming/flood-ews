"use client";

import Image from "next/image";
import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
	return (
		<footer className="container flex bottom-0 left-0 right-0 bg-tea-green-100 h-auto items-center justify-between">
			<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© 2023{" "}
					<a
						href="https://github.com/zcodming"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline">
						Made By - Zahwa Tri Riyanto
					</a>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};

export default Footer;
