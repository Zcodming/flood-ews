import Icons from "@/components/Icons";
import UserForm from "@/components/form/UserForm";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Flood-EWS | Create Account",
	description: "Create Account",
};

interface pageProps {}

const page = async () => {
	return (
		<div className="relative ml-4 mr-12 mt-4">
			<div className="flex flex-warp justify-between">
				<LargeHeading className="items-start" size="sm">
					Add New User
				</LargeHeading>
				<Link
					href={"/account"}
					className={
						buttonVariants({ variant: "default" }) + " items-end flex flex-wrap justify-between"
					}>
					<Icons.ChevronLeft />
					<span>Back</span>
				</Link>
			</div>
			<div className="relative mt-8 bg-slate-600 rounded-lg">
				<UserForm />
			</div>
		</div>
	);
};

export default page;
