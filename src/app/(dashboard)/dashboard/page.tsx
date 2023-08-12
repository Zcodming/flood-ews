import QRCodeContainer from "@/components/QRCodeContainer";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { authOptions } from "@/library/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Flood-EWS | Dashboard",
	description: "Monitoring water-level Activity Here",
};

interface PageProps {}

const page: ({}: PageProps) => Promise<JSX.Element> = async () => {
	const user = await getServerSession(authOptions);
	let userId = user!.user.id;
	if (!user) return notFound();

	
	return (
		<div className="w-full h-full container flex flex-col gap-6">
			<LargeHeading>Welcome {user.user.name}</LargeHeading>
			<div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
				<Paragraph>Your Dashboard</Paragraph>
			</div>

			<QRCodeContainer userId={userId} />

			<Paragraph className="text-center md:text-left mt-4 -mb-4 ">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eius saepe odio tempora
				temporibus, culpa repellendus, officia recusandae eos quo, voluptas nemo eveniet iusto.
				Consequuntur cupiditate ratione consequatur quidem minus!
			</Paragraph>
		</div>
	);
};

export default page;
