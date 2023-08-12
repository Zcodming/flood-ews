import Table from "@/components/Table";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/library/auth";
import { db } from "@/library/db";
import { formatDistance } from "date-fns";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Flood-EWS | Account",
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
		updateAt: formatDistance(new Date(req.updateAt), new Date()),
	}));

	return (
		<div className="relative ml-4 mr-12 mt-4">
			<div className="flex flex-warp justify-between">
				<LargeHeading className="items-start" size="sm">
					This is Account page
				</LargeHeading>
				<Link
					href={"/account/create-user"}
					className={buttonVariants({ variant: "green" }) + " items-end"}>
					<span>Create User</span>
				</Link>
			</div>
			<div className="relative mt-8">
				<div className="flex flex-col gap-6 mt-8 mr-8 max-w-4xl">
					<Table userRequests={serializableRequests} />
				</div>
			</div>
		</div>
	);
};

export default page;
