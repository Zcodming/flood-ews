import { authOptions } from "@/library/auth";
import { db } from "@/library/db";
import Button from "@/ui/Button";

import { getServerSession } from "next-auth";

interface MonitoringTableProps {}

interface Data {
    result: any;
}

const MonitoringTable = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user.id;
    const role = session?.user.role;

    const location =
        role == "ADMIN"
            ? await db.locations.findMany()
            : await db.locations.findMany({
                  where: {
                      userId: user,
                  },
              });

    const device = await db.devices.findMany();

    return (
        <>
            {location.map((list) => (
                <div className="w-full h-auto pb-6" key={list.id}>
                    <div className="w-full flex flex-col justify-between bg-white rounded-md">
                        <div className="flex flex-wrap justify-between my-4 mx-4">
                            <div className="items-start flex-wrap">
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
                                    <div
                                        className="max-w-1/2 w-[400px] items-start bg-slate-400 rounded-md"
                                        key={data.id}
                                    >
                                        <div className="h-18 px-2 py-2 justify-between items-center flex flex-wrap">
                                            <span className="items-start flex-warp">
                                                <b>Device : </b>
                                                {data.deviceName}
                                            </span>
                                            {/* <Button
                                                className="items-end flex-warp"
                                                variant={"outline"}
                                            >
                                                <span>Action</span>
                                            </Button> */}
                                            <span>
                                                {/* {JSON.stringify(data?.result)} */}
                                            </span>
                                        </div>
                                        <div className="h-18 px-2 py-2 flex flex-col items-start justify-between w-full">
                                            <iframe
                                                width="380"
                                                height="220"
                                                className="border: 1px solid #cccccc;"
                                                src={
                                                    "https://thingspeak.com/channels/" +
                                                    data.channelId +
                                                    "/charts/" +
                                                    data.field +
                                                    "?bgcolor=%23ffffff&color=%23d62020&days=1&dynamic=true&max=300&min=100&results=60&type=line&yaxismax=260&yaxismin=120"
                                                }
                                            ></iframe>
                                        </div>
                                    </div>
                                ) : (
                                    <span
                                        key={data.id}
                                        className="rounded-md h-auto w-full border-dashed border-white border-2 justify-center py-2 text-center"
                                    >
                                        No Device in Location - Call Admin to
                                        Add Device
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MonitoringTable;
