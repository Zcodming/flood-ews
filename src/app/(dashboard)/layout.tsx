import Sidebar from "@/components/Sidebar";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<section className="pt-20">
			<div className="max-w-7xl mr-auto mt-12 xl:ml-72 md:ml-24">{children}</div>

			{/* @ts-expect-error Server Component */}
			<Sidebar />
		</section>
	);
}
