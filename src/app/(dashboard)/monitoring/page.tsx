import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/library/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "Flood Early Warning | Monitoring",
	description: "Monitoring Water Height",
};

const page = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	return (
		<>
			<LargeHeading>This is Monitoring page</LargeHeading>
			<div className="flex flex-wrap py-4">
				<div className="pr-4 py-2">
					<iframe
						width="450"
						height="260"
						className="border-2 bg-slate-300"
						src="https://thingspeak.com/channels/1858724/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
				</div>
				<div className="pr-4 py-2">
					<iframe
						width="450"
						height="260"
						className="border-2 bg-slate-300"
						src="https://thingspeak.com/channels/1858724/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
				</div>
				<div className="pr-4 py-2">
					<iframe
						width="450"
						height="260"
						className="border-2 bg-slate-300"
						src="https://thingspeak.com/channels/1858724/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
				</div>
			</div>
		</>
	);
};

export default page;
