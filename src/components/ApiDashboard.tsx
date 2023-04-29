import { authOptions } from "@/library/auth";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const ApiDashboard = async () => {
	const user = await getServerSession(authOptions);
	if (!user) notFound();

	return (
		<div className="container flex flex-col gap-6">
			<LargeHeading>Welcome {user.user.name}</LargeHeading>
			<div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
				<Paragraph>Your API Key:</Paragraph>
			</div>

			<Paragraph className="text-center md:text-left mt-4 -mb-4 ">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur eius saepe odio tempora
				temporibus, culpa repellendus, officia recusandae eos quo, voluptas nemo eveniet iusto.
				Consequuntur cupiditate ratione consequatur quidem minus!
			</Paragraph>
			<Paragraph className="text-center md:text-left mt-4 -mb-4 ">Your API history:</Paragraph>
		</div>
	);
};

export default ApiDashboard;
