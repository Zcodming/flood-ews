import SignOutButton from "@/button/SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { authOptions } from "@/library/auth";
import { buttonVariants } from "@/ui/Button";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Navbar = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className="fixed bg-transparent dark:bg-transparent z-40 top-0 left-0 right-0 h-20 mt-4 flex items-center justify-between">
			<div className="sticky max-w-7xl w-full flex justify-between xl:ml-72 xl:w-9/12 md:ml-24 mr-4 pr-2 pl-4 py-4 rounded-xl backdrop-blur-md">
				<Link href="/" className={buttonVariants({ variant: "link" }) + " xl:pl-20 xl:invisible"}>
					Flood - Early Warning
				</Link>

				<div className="md:hidden">
					<ThemeToggle />
				</div>

				<div className="hidden md:flex gap-4">
					<ThemeToggle />
					<Link href="/documentation" className={buttonVariants({ variant: "ghost" })}>
						Documentation
					</Link>

					{session ? (
						<>
							<Link
								href="/dashboard"
								className={buttonVariants({
									variant: "ghost",
								})}>
								Dashboard
							</Link>
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
		</div>
	);
};

export default Navbar;
