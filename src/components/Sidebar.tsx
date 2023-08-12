"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import Icons from "./Icons";
import { buttonVariants } from "./ui/Button";

interface SidebarProps {
	isAdmin: boolean;
	session: any;
}

const Sidebar: FC<SidebarProps> = ({ isAdmin, session }) => {
	const [collapseShow, setCollapseShow] = React.useState<boolean>(true);
	const [menuStyle, setMenuStyle] = React.useState<string>(" xl:w-72 ");

	const pathname = usePathname();

	function toggleMenu() {
		setCollapseShow(!collapseShow);

		if (collapseShow) {
			setMenuStyle(" w-72 ");
		}

		if (!collapseShow) {
			setMenuStyle(" w-24 ");
		}
	}

	return (
		<>
			{session ? (
				<aside
					className={
						"float-left md:left-0 z-50 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-between xl:w-72 md:w-24 py-8 px-4"
					}>
					<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto object-fill">
						{/** Logo */}
						<Link
							className={
								buttonVariants({
									variant: "link",
								}) +
								"flex items-center justify-center text-center md:pb-2 mr-0 whitespace-nowrap uppercase font-bold p-4 px-0"
							}
							href="/">
							<Image
								src="/logo/logo_fews.png"
								alt="logo"
								style={{ objectFit: "initial" }}
								width={30}
								height={30}
							/>
							<span className="hidden xl:block mr-2 px-2">Flood - Early Warning</span>
						</Link>

						{/** Collapse Menu */}
						<nav className="md:flex md:flex-col lg:items-stretch md:opacity-100 md:relative mt-8 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ">
							{/** Collapse Header */}
							<div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
								<div className="flex flex-warp">
									<div className="w-6/12">
										<Link
											className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
											href="/">
											F-EWS
										</Link>
									</div>
								</div>
							</div>

							{/** Form Search */}

							{/** Divider */}

							{/** Navigation */}
							<ul className="md:flex-col md:max-w-full md:max-h-full pr-4 flex flex-col list-none items-start">
								<li className="xl:mx-2 my-2 w-full h-full">
									<Link
										className={buttonVariants({
											variant: "ghost",
											className: "pr-4 py-4 w-full h-full items-start justify-stretch",
											active: pathname !== "/dashboard" ? "off" : "on",
										})}
										href="/dashboard">
										<Icons.LayoutDashboard className="shrink-0" />
										<span className="pl-4 hidden xl:block">Dashboard</span>
									</Link>
								</li>

								<li className="xl:mx-2 my-2 w-full h-full">
									<Link
										className={buttonVariants({
											variant: "ghost",
											className: "pr-4 py-4 w-full h-full items-start justify-stretch",
											active: pathname !== "/monitoring" ? "off" : "on",
										})}
										href="/monitoring">
										<Icons.LineChart className="shrink-0" />
										<span className="pl-4 hidden xl:block">Monitoring</span>
									</Link>
								</li>

								<li className="xl:mx-2 my-2 w-full h-full">
									<Link
										className={buttonVariants({
											variant: "ghost",
											className: "pr-4 py-4 w-full h-full items-start justify-stretch",
											active: pathname !== "/maps" ? "off" : "on",
										})}
										href="/maps">
										<Icons.LineChart className="shrink-0" />
										<span className="pl-4 hidden xl:block">Maps</span>
									</Link>
								</li>

								{isAdmin ? (
									<li className="xl:mx-2 my-2 w-full">
										<Link
											className={buttonVariants({
												variant: "ghost",
												className:
													"pr-4 py-4 w-full h-full items-start justify-stretch",
												active: pathname !== "#" ? "off" : "on",
											})}
											href="/device">
											<Icons.Wrench className="shrink-0" />
											<span className="pl-4 hidden xl:block">Sensor Device</span>
										</Link>
									</li>
								) : null}

								<li className="xl:mx-2 my-2 w-full">
									<Link
										className={buttonVariants({
											variant: "ghost",
											className: "pr-4 py-4 w-full h-full items-start justify-stretch",
											active: pathname !== "#" ? "off" : "on",
										})}
										href="/whatsapp">
										<Icons.MessageCircle className="shrink-0" />
										<span className="pl-4 hidden xl:block">Whatsapp Gateway</span>
									</Link>
								</li>

								{isAdmin ? (
									<li className="xl:mx-2 my-2 w-full">
										<Link
											className={buttonVariants({
												variant: "ghost",
												className:
													"pr-4 py-4 w-full h-full items-start justify-stretch",
												active: pathname !== "/account" ? "off" : "on",
											})}
											href="/account">
											<Icons.User className="shrink-0" />
											<span className="pl-4 hidden xl:block">Account</span>
										</Link>
									</li>
								) : null}

								{!isAdmin ? (
									<li className="xl:mx-2 my-2 w-full">
										<Link
											className={buttonVariants({
												variant: "ghost",
												className:
													"pr-4 py-4 w-full h-full items-start justify-stretch",
												active: pathname !== "/profile" ? "off" : "on",
											})}
											href="/profile">
											<Icons.User className="shrink-0" />
											<span className="pl-4 hidden xl:block">Profile</span>
										</Link>
									</li>
								) : null}
							</ul>
						</nav>
						{/* <Button className="mx-2 shrink-0" onClick={toggleMenu}>
						<Icons.Menu />
					</Button>
					<Button variant="ghost" onClick={toggleMenu}>
						<Icons.X />
					</Button> */}
					</div>
				</aside>
			) : (
				<div className="hidden"></div>
			)}
		</>
	);
};

export default Sidebar;
