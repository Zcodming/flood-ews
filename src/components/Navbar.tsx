"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import ThemeToggle from "./ThemeToggle";
import SignOutButton from "./button/SignOutButton";
import { buttonVariants } from "./ui/Button";
import Paragraph from "./ui/Paragraph";

interface NavbarProps {
	role: String;
	name: String;
	session: boolean;
}

const Navbar: FC<NavbarProps> = ({ role, name, session }) => {
	const pathname = usePathname();

	return (
		<>
			{pathname !== "/restricted" ? (
				<nav className="fixed container bg-transparent dark:bg-transparent z-40 top-0 left-0 right-0 h-20 mt-4 flex items-center justify-between">
					<div
						className={
							"sticky max-w-7xl w-full flex justify-between mr-4 pr-2 pl-4 py-4 rounded-xl backdrop-blur-md dark:backdrop-blur-lg  " +
							(pathname == "/" || "/login" ? " " : " xl:ml-72 xl:w-9/12 md:ml-24 ")
						}>
						<Link
							href="/"
							className={
								buttonVariants({
									variant: "link",
								}) + (pathname == "/" || "/login" ? " " : " xl:pl-20 invisible ")
							}>
							<Image
								src="/logo/logo_fews.png"
								alt="logo"
								style={{ objectFit: "initial" }}
								width={30}
								height={30}
							/>
							<span className="hidden xl:block mr-2 px-2">Flood - Early Warning</span>
						</Link>

						<div className="md:hidden">
							<ThemeToggle />
						</div>

						<div className="hidden md:flex gap-4">
							<ThemeToggle />
							{/* <Link href="/documentation" className={buttonVariants({ variant: "ghost" })}>
						Documentation
					</Link> */}

							{session ? (
								<>
									<Link
										href="/dashboard"
										className={buttonVariants({
											variant: "ghost",
										})}>
										Dashboard
									</Link>
									<div className="mr-3 my-2 dark:text-slate-500">
										<Paragraph size={"sm"}>
											<b>Hello, {role.toLowerCase()}</b> : {name}
										</Paragraph>
									</div>
									<SignOutButton />
								</>
							) : (
								<Link
									className={buttonVariants({
										variant: "default",
										className: "w-fit",
									})}
									href="/login">
									Login
								</Link>
							)}
						</div>
					</div>
				</nav>
			) : null}
		</>
	);
};

export default Navbar;
