import Table from "@/components/Table";
import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/library/auth";
import { db } from "@/library/db";
import { formatDistance } from "date-fns";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Flood Early Warning | Account",
	description: "Setting Account",
};

const page = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	if (user?.user.role !== "ADMIN") return notFound();

	const userRequests = await db.user.findMany();

	const serializableRequests = userRequests.map((req) => ({
		...req,
		createAt: formatDistance(new Date(req.createAt), new Date()),
	}));

	return (
		<>
			<LargeHeading>This is Account page</LargeHeading>
			<div className="flex flex-col gap-6 mt-8 mr-8 max-w-4xl">
				<Table userRequests={serializableRequests}></Table>
			</div>
		</>
	);
};

export default page;
