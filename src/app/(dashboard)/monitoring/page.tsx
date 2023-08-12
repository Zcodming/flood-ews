import MonitoringTable from "@/components/table/MonitoringTable";
import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/library/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Flood-EWS | Monitoring",
	description: "Monitoring Water Height",
};

const page = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	return (
		<div className="relative ml-4 mr-12 mt-4">
			<div className="flex flex-warp justify-between">
				<LargeHeading className="items-start" size="sm">
					This Is Monitoring Page
				</LargeHeading>
			</div>
			<div className="relative mt-8">
				{/* @ts-expect-error Server Component */}
				<MonitoringTable />
			</div>
		</div>
	);
};

export default page;
