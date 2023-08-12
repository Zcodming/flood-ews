import GoogleAuthButton from "@/button/GoogleAuthButton";
import CredentialsForm from "@/components/CredentialsForm";
import Icons from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

export const metadata: Metadata = {
	title: "F-EWS  -  Login",
};

const page: FC = () => {
	return (
		<div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center">
			<div className="mx-auto flex flex-col w-full justify-center space-y-6 max-w-lg">
				<div className="flex flex-col items-center gap-6 text-center px-6 py-6">
					<Link
						className={buttonVariants({
							variant: "ghost",
							className: "w-fit z-50 justify-start items-start",
						})}
						href="/">
						<Icons.ChevronLeft className="mr-2 h-4 w-4" />
						Back to home
					</Link>

					<LargeHeading>Login First</LargeHeading>
					<Paragraph>Login With Your Account</Paragraph>

					{/* Make Login Card  */}
					<CredentialsForm />

					{/* <Paragraph>or Sign In using your Google Account</Paragraph>

					<GoogleAuthButton /> */}
				</div>
			</div>
		</div>
	);
};

export default page;
