import Icons from "@/components/Icons";
import DeviceForm from "@/components/form/DeviceForm";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import { db } from "@/library/db";
import { formatDistance } from "date-fns";
import Link from "next/link";

export default async function CreateLocationPage({ searchParams }: { searchParams: any }) {
	const locationRequests = await db.locations.findMany();

	const locationId = searchParams.locationId;
	const address = searchParams.address;
	const userId = searchParams.userId;

	const serializableRequests = locationRequests.map((req) => ({
		...req,
		createAt: formatDistance(new Date(req.createAt), new Date()),
		updateAt: formatDistance(new Date(req.updateAt), new Date()),
	}));

	return (
		<div className="relative ml-4 mr-12 mt-4">
			<div className="flex flex-warp justify-between">
				<LargeHeading className="items-start" size="sm">
					Add New Device
				</LargeHeading>
				<Link
					href={"/device"}
					className={
						buttonVariants({ variant: "default" }) + " items-end flex flex-wrap justify-between"
					}>
					<Icons.ChevronLeft />
					<span>Back</span>
				</Link>
			</div>
			<div className="relative mt-8 bg-slate-600 rounded-lg">
				<DeviceForm
					locationRequests={serializableRequests}
					locationId={locationId}
					address={address}
					userId={userId}
				/>
			</div>
		</div>
	);
}
