import Sidebar from "@/components/Sidebar";
import type { ReactNode } from "react";
import { authOptions } from "@/library/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Layout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions);
	let isAdmin = true;
	let userId = session?.user.id;

	if (session?.user.role !== "ADMIN") {
		isAdmin = false;
	}

	return (
		<>
			<Sidebar session={session} isAdmin={isAdmin} userId={userId} />

			<article className="float-right w-9/12 pt-4 mr-auto mt-3">{children}</article>
		</>
	);
}
