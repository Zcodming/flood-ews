"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import QRCode from "react-qr-code";
import Paragraph from "./ui/Paragraph";
import MessageForm from "./form/MessageForm";
import { promises as fs } from "fs";
// import { io, Socket } from "socket.io-client";
import { toast } from "./ui/Toast";

// const socket: Socket = io("http://localhost:3000", { path: "/src/app/(dashboard)/socket.io" });
interface QRCodeContainerProps {
    userId: string;
}

const QRCodeContainer: FC<QRCodeContainerProps> = ({ userId }) => {
    const [qrCode, setQrCode] = React.useState("");
    const [checkSession, setCheckSession] = React.useState("");
    const [message, setMessage] = React.useState<string>(
        "This Is A Test Message"
    );
    const [phoneNumber, setPhoneNumber] =
        React.useState<string>("62895346793826");

    // const createWhatsappSession = () => {
    // 	console.log("Creating Whatsapp Session");
    // 	socket.emit("create-session");
    // };

    // const checkWhatsappSession = () => {
    // 	console.log("Checking Whatsapp Session");
    // 	socket.emit("check-session");
    // };

    // const sendWhatsappMessage = () => {
    // 	console.log("Sending Whatsapp Message");
    // 	socket.emit("send-message", { phoneNumber, message });
    // };

    // React.useEffect(() => {
    //     // checkWhatsappSession();
    //     async function readData(qrCode: any) {
    //         const file = await fs.readFile(
    //             process.cwd() + "./src/library/wa-webjs/last.qr",
    //             "utf8"
    //         );
    //         const data = JSON.parse(file);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // const wait = (ms: number) =>
    //     new Promise((resolve) => setTimeout(resolve, ms));

    // useQuery({
    //     queryKey: ["check-session"],
    //     queryFn: async () => {
    //         const { data } = await axios.get(
    //             `http://localhost:3000/api/whatsapp`
    //         );
    //         setCheckSession(data);
    //         return data;
    //     },
    // });

    // const { data, isLoading, isError, error } = useQuery({
    //     queryKey: ["get-qr-code"],
    //     queryFn: async () => {
    //         const { data } = await axios.get(
    //             `http://localhost:3000/api/whatsapp`
    //         );
    //         setQrCode(data);
    //         return data;
    //     },
    //     refetchInterval: 20000,
    // });
    const { data, refetch, isLoading, isError, error } = useQuery({
        queryKey: ["get-qr-code"],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:3000/api/whatsapp`,
                {
                    params: { id: userId },
                }
            );
            setQrCode(data.qrCode);
            return data;
        },
        refetchInterval: 20000,
    });

    return (
        <>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <>
                        <p>Error</p>
                        <br />
                        <p>{JSON.stringify(error)}</p>
                    </>
                ) : (
                    <>
                        {data == "You are logged in." ? (
                            <p>{JSON.stringify(data)}</p>
                        ) : (
                            <>
                                <QRCode value={qrCode} />
                                <br />
                            </>
                        )}
                    </>
                )}
            </div>
            {/* {data == "Client is Ready!" ? null : (
                <>
                    <div>
                        <button
                            onClick={() => refetch()}
                            className="bg-slate-800 text-white rounded-md px-4 py-2"
                        >
                            Refresh QR Code
                        </button>
                    </div>
                </>
            )} */}
            {/* <div>
                <QRCode value={data.data} />
                <p>{JSON.stringify(data)}</p>
                <br />
            </div> */}
            {/* <div>
                <button
                    onClick={() => sendWhatsappMessage()}
                    className="bg-slate-800 text-white rounded-md px-4 py-2"
                >
                    Refresh QR Code
                </button>
            </div> */}
            <div>
                <MessageForm />
            </div>
        </>
        // <>
        // 	<div>
        // 		<QRCode value={qrCode} />
        // 		<br />
        // 		<Paragraph className="text-left font-bold">{qrCode}</Paragraph>
        // 	</div>
        // </>
    );
};

export default QRCodeContainer;
