import { db } from "@/library/db";
import Button, { buttonVariants } from "@/ui/Button";
import Link from "next/link";

interface LocationsTableProps {}

const LocationsTable = async () => {
	const location = await db.locations.findMany();

	const device = await db.devices.findMany();

	return (
		<>
			{location.map((list) => (
				<div className="w-full h-auto pb-6" key={list.id}>
					<div className="w-full flex flex-col justify-between bg-white rounded-md">
						<div className="flex flex-wrap justify-between my-4 mx-4">
							<div className="items-start flex-col">
								<span className="mr-4">
									<b>Location : </b>
									{list.address}
								</span>
								<span>
									<b>User : </b>
									{list.userName}
								</span>
							</div>
							<div className="items-end flex-wrap">
								<Link
									href={{
										pathname: "/device/create-device",
										query: {
											locationId: list.id,
											address: list.address,
											userId: list.userId,
										},
									}}
									className={buttonVariants({ variant: "green" }) + " mr-4"}>
									<span>Add Device</span>
								</Link>
								<Button className="" variant={"outline"}>
									<span>Action</span>
								</Button>
								<Button className="ml-4">
									<span>Collapse</span>
								</Button>
							</div>
						</div>
					</div>

					<div className="h-auto flex flex-warp justify-between mx-6 bg-slate-500 rounded-b-md">
						<div className="text-white w-full gap-4 mx-4 my-4 flex flex-warp justify-start">
							{device.map((data) =>
								data.locationId === list.id ? (
									<div className="w-1/3 items-start bg-slate-400 rounded-md" key={data.id}>
										<div className="h-18 px-2 py-2 justify-between items-center flex flex-wrap">
											<span className="items-start flex-warp">{data.deviceName}</span>
											<Button className="items-end flex-warp" variant={"outline"}>
												<span>Action</span>
											</Button>
										</div>
										<div className="h-18 px-2 py-2 flex flex-col items-start justify-between w-full">
											<span className="text-center">Field : {data.field}</span>
											<span className="text-center">Channel ID : {data.channelId}</span>
										</div>
									</div>
								) : (
									<Link
										href={{
											pathname: "/device/create-device",
											query: {
												locationId: list.id,
											},
										}}
										key={data.id}
										className={
											buttonVariants({ variant: "link" }) +
											" rounded-md h-auto w-full border-dashed border-white border-2 justify-center items-center"
										}>
										<span>No Device in Location - Click to Add Device</span>
									</Link>
								)
							)}
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default LocationsTable;
