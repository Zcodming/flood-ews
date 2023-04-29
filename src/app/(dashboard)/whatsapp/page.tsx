import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/library/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const page = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	return <LargeHeading>This Is Whatsapp Page</LargeHeading>;
};

export default page;
