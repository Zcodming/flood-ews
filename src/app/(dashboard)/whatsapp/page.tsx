import MessageForm from "@/components/form/MessageForm";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/library/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Flood-EWS | Whatsapp",
	description: "Whatsapp Gateway Page",
};

const page = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	return (
		<div className="relative ml-4 mr-12 mt-4">
			<div className="flex flex-warp justify-between">
				<LargeHeading className="items-start" size="sm">
					This Is Whatsapp Page
				</LargeHeading>
				<Link
					href={"/whatsapp/create-staf"}
					className={buttonVariants({ variant: "green" }) + " items-end"}>
					<span>Add Staf</span>
				</Link>
			</div>
			<MessageForm />
		</div>
	);
};

export default page;
