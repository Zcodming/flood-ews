import Icons from "@/components/Icons";
import SignOutButton from "@/components/button/SignOutButton";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { authOptions } from "@/library/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Restricted",
	description: "You're not authorize!",
};

const inter = Inter({ subsets: ["latin"] });

const Restricted = async () => {
	const user = await getServerSession(authOptions);

	const role = `${user?.user.role}`;
	const name = `${user?.user.name}`;

	return (
		<main className="relative h-screen flex item-center justify-center overflow-x-hidden">
			<div className="container max-w-7xl mx-auto w-full h-full">
				<div className="h-full gap-6 flex flex-col justify-center items-center">
					<Link
						className={buttonVariants({
							variant: "ghost",
							className: "w-fit z-50 justify-start items-start",
						})}
						href="/">
						<Icons.ChevronLeft className="mr-2 h-4 w-4" />
						Back to home
					</Link>
					<LargeHeading size={"lg"} className="text-hunter-green-200 dark:tea-green-100">
						{name}, You Are Not Authorize
					</LargeHeading>
					<Paragraph>Try to login with authorize account.</Paragraph>
					{user ? (
						<SignOutButton />
					) : (
						<Link href={"/login"} className={buttonVariants()}>
							<span>Login</span>
						</Link>
					)}
				</div>
			</div>
		</main>
	);
};

export default Restricted;
