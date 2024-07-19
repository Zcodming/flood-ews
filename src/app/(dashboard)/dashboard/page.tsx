<<<<<<< HEAD
import MessageForm from "@/components/form/MessageForm";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
=======
import MessageForm from "@/form/MessageForm";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
>>>>>>> 8bb988241466d87e8bfed0942d94c1adced58245
import { authOptions } from "@/library/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Flood-EWS | Dashboard",
    description: "Monitoring water-level Activity Here",
};

interface PageProps {}

const page: ({}: PageProps) => Promise<JSX.Element> = async () => {
    const user = await getServerSession(authOptions);
<<<<<<< HEAD
=======
    let userId = user!.user.id;
>>>>>>> 8bb988241466d87e8bfed0942d94c1adced58245
    if (!user) return notFound();

    return (
        <div className="w-full h-full container flex flex-col gap-6">
            <LargeHeading>Welcome {user.user.name}</LargeHeading>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
                <Paragraph>Your Dashboard</Paragraph>
            </div>

            <MessageForm />

            <Paragraph className="text-center md:text-left mt-4 -mb-4 ">
<<<<<<< HEAD
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur eius saepe odio tempora temporibus, culpa
                repellendus, officia recusandae eos quo, voluptas nemo eveniet
                iusto. Consequuntur cupiditate ratione consequatur quidem minus!
=======
                Scan QR code untuk login ke WhatsApp, tekan tombol refresh jika
                QR code tidak muncul atau tidak bisa di-scan.
>>>>>>> 8bb988241466d87e8bfed0942d94c1adced58245
            </Paragraph>
        </div>
    );
};

export default page;
