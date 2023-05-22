import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Flood Early Warning System",
	description: "Real Time Flood Notification Warning With WhatsApp API",
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<div className="relative h-screen flex item-center justify-center overflow-x-hidden">
			<div className="container pt-32 max-w-7xl mx-auto w-full h-full">
				<div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
					<LargeHeading size="lg" className="three-d text-black dark:text-light-blue">
						Be flood-ready
						<br /> with our system
					</LargeHeading>
					<Paragraph>
						Welcome to the Flood Early Warning System website! We provide information to help you
						prepare for flooding. Our technology and team can help you stay safe during floods.
						Learn more about our services and how we can help you stay ahead of the flood.
					</Paragraph>
					{/* <div className="relative w-full max-w-lg lg:max-w-3xl  lg:left-1/2 aspect-square lg:absolute">
						<Image
							priority
							className="img-shadow"
							quality={100}
							style={{ objectFit: "contain" }}
							fill
							src="/typewriter.png"
							alt="typewriter"
						/>
					</div> */}
				</div>
			</div>
		</div>
	);
}
