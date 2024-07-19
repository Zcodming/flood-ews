"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import QRCode from "react-qr-code";
import Paragraph from "./ui/Paragraph";
import MessageForm from "./form/MessageForm";
// import { io, Socket } from "socket.io-client";
import { toast } from "./ui/Toast";

// const socket: Socket = io("http://localhost:3000", { path: "/src/app/(dashboard)/socket.io" });
interface QRCodeContainerProps {
	userId: string;
}

const QRCodeContainer: FC<QRCodeContainerProps> = ({ userId }) => {
	const [qrCode, setQrCode] = React.useState("");
	const [checkSession, setCheckSession] = React.useState("");
	const [message, setMessage] = React.useState<string>("This Is A Test Message");
	const [phoneNumber, setPhoneNumber] = React.useState<string>("62895346793826");

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
	// 	// checkWhatsappSession();
	// 	createWhatsappSession();
	// 	socket.on("qr", (data: any) => {
	// 		const { qr } = data;
	// 		console.log("QR Received from Server", qr);
	// 		setQrCode(qr);
	// 	});
	// 	socket.on("message", (data: any) => {
	// 		const { title, notification, type } = data;
	// 		console.log("Message Received from Server", notification);
	// 		toast({
	// 			title: title,
	// 			message: notification,
	// 			type: type,
	// 		});
	// 	});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	// useQuery({
	// 	queryKey: ["check-session"],
	// 	queryFn: async () => {
	// 		const { data } = await axios.get(`http://localhost:3000/api/whatsapp`);
	// 		setCheckSession(data);
	// 		return data;
	// 	},
	// });

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["get-qr-code"],
		queryFn: async () => {
			const { data } = await axios.get(`http://localhost:3000/api/getqr`);
			setQrCode(data);
			return data;
		},
		refetchInterval: 20000,
	});
	// const { data, refetch, isLoading, isError, error } = useQuery({
	// 	queryKey: ["get-qr-code"],
	// 	queryFn: async () => {
	// 		const { data } = await axios.get(`http://localhost:3000/api/whatsapp`, {
	// 			params: { id: userId },
	// 		});
	// 		setQrCode(data.qrCode);
	// 		return data;
	// 	},
	// 	refetchInterval: 20000,
	// });

	return (
		<>
			{/* <div>
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
						{data == "You are logged in." ? null : (
							<>
								<QRCode value={qrCode} />
								<br />
							</>
						)}
						<p>{JSON.stringify(data)}</p>
						<Paragraph className="text-left font-bold">{JSON.stringify(data)}</Paragraph>
					</>
				)}
			</div>
			{data == "Client is Ready!" ? null : (
				<>
					<div>
						<button
							onClick={() => refetch()}
							className="bg-slate-800 text-white rounded-md px-4 py-2">
							Refresh QR Code
						</button>
					</div>
				</>
			)} */}
			<div>
				<QRCode value={qrCode} />
				<br />
			</div>
			<div>
				{/* <button
					onClick={() => sendWhatsappMessage()}
					className="bg-slate-800 text-white rounded-md px-4 py-2">
					Refresh QR Code
				</button> */}
			</div>
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
