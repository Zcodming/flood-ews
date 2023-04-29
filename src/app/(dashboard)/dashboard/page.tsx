import ApiDashboard from "@/components/ApiDashboard";
import { authOptions } from "@/library/auth";
import { db } from "@/library/db";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Flood Early Warning | Dashboard",
	description: "Monitoring water-level Activity Here",
};

const page = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	return (
		<>
			{/* @ts-expect-error Server Component */}
			<ApiDashboard />
		</>
	);
};

export default page;
