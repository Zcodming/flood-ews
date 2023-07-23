"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import QRCode from "react-qr-code";
import { toast } from "./ui/Toast";

interface QRCodeContainerProps {
	userId: string;
}

const QRCodeContainer: FC<QRCodeContainerProps> = ({ userId }) => {
	const [message, setMessage] = React.useState<string>("This Is A Test Message");

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	// const data: any = await checkWhatsappSession(user.user.id);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["get-qr-code"],
		staleTime: Infinity,
		cacheTime: Infinity, // data not refetch infinitely
		queryFn: async () => {
			await wait(1000);
			const { data } = await axios.get(`http://localhost:3000/api/whatsapp`, {
				params: { id: userId },
			});
			return data;
		},
	});

	const handleClick = () => {
		// manually refetch
		refetch();
	};

	const { refetch } = useQuery({
		queryKey: ["send-message"],
		refetchOnWindowFocus: false,
		enabled: false, // disable this query from automatically running
		queryFn: async () => {
			await wait(1000);
			try {
				await axios.post(`http://localhost:3000/api/whatsapp`, message);
				toast({ title: "Success!", message: "Notification Message Sent!", type: "success" });
			} catch (error) {
				toast({ title: "Error!", message: "Notification Message Failed to Send!", type: "error" });
			}
		},
	});

	// <QRCode value={fetchQRCode.data} />;
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
						<QRCode value={data} />
						<br />
						<p>{JSON.stringify(data)}</p>
					</>
				)}
			</div>
			{/* <p>{JSON.stringify(data)}</p> */}
			<div>
				<button onClick={handleClick} className="bg-slate-800 text-white rounded-md px-4 py-2">
					Send Message
				</button>
			</div>
		</>
	);
};

export default QRCodeContainer;
