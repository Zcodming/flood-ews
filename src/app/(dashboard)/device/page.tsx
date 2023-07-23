import LocationsTable from "@/components/table/LocationsTable";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/library/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Flood-EWS | Device",
	description: "Device Setup",
};

const page = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	if (user?.user.role !== "ADMIN") return notFound();

	return (
		<div className="relative ml-4 mr-12 mt-4">
			<div className="flex flex-warp justify-between">
				<LargeHeading className="items-start" size="sm">
					This Is Device Page
				</LargeHeading>
				<Link
					href={"/device/create-location"}
					className={buttonVariants({ variant: "green" }) + " items-end"}>
					<span>Add Location</span>
				</Link>
			</div>
			<div className="relative mt-8">
				{/* <Link
						href={"/device/location"}
						className={
							buttonVariants({ variant: "link" }) +
							" rounded-md h-80 w-full border-dashed border-white border-2 justify-center items-center flex flex-col"
						}>
						<span>No Location Found</span>
						<span>Click to Add Location</span>
					</Link> */}
				
				<LocationsTable />
			</div>
		</div>
	);
};

export default page;
