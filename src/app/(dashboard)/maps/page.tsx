import Map from "@/components/map/Map";
import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/library/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Flood-EWS | Maps",
	description: "Device Maps Location Page",
};

const page = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	return (
		<div className="relative ml-4 mr-12 mt-4">
			<LargeHeading className="items-start" size="sm">
				This Is Maps Page
			</LargeHeading>
			<div className="relative mt-2 pb-4 max-w-5xl w-full flex items-center justify-start">
				<Map />
			</div>
		</div>
	);
};

export default page;
