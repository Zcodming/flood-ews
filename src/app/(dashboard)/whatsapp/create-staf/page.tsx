import Icons from "@/components/Icons";
import StafForm from "@/components/form/StafForm";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import { db } from "@/library/db";
import { formatDistance } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Flood-EWS | Add Staf",
	description: "Adding Staf Information",
};

interface pageProps {}

const page = async () => {
	const locationsRequests = await db.locations.findMany();

	const serializableRequests = locationsRequests.map((req) => ({
		...req,
		createAt: formatDistance(new Date(req.createAt), new Date()),
		updateAt: formatDistance(new Date(req.updateAt), new Date()),
	}));

	return (
		<div className="relative ml-4 mr-12 mt-4">
			<div className="flex flex-warp justify-between">
				<LargeHeading className="items-start" size="sm">
					Add New Staf
				</LargeHeading>
				<Link
					href={"/whatsapp"}
					className={
						buttonVariants({ variant: "default" }) + " items-end flex flex-wrap justify-between"
					}>
					<Icons.ChevronLeft />
					<span>Back</span>
				</Link>
			</div>
			<div className="relative mt-8 bg-slate-600 rounded-lg">
				<StafForm locationsRequests={serializableRequests} />
			</div>
		</div>
	);
};

export default page;
