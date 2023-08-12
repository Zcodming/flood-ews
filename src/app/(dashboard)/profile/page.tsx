import LargeHeading from "@/components/ui/LargeHeading";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Flood-EWS | Profile",
	description: "User Profile Page",
};

const page = async () => {
	return <LargeHeading>This Is Profile Page</LargeHeading>;
};

export default page;
