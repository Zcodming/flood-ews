import LargeHeading from "@/components/ui/LargeHeading";
import { authOptions } from "@/library/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const page = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	if (user?.user.role !== "ADMIN") return notFound();

	return <LargeHeading>This Is Device Page</LargeHeading>;
};

export default page;
