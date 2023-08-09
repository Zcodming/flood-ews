"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import QRCode from "react-qr-code";
import { toast } from "./ui/Toast";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";

interface QRCodeContainerProps {
	userId: string;
}

const QRCodeContainer: FC<QRCodeContainerProps> = ({ userId }) => {
	const [message, setMessage] = React.useState<string>("This Is A Test Message");

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	// const data: any = await checkWhatsappSession(user.user.id);
	const { data, refetch, isLoading, isError, error } = useQuery({
		queryKey: ["get-qr-code"],
		// data not refetch infinitely
		cacheTime: Infinity,
		staleTime: Infinity,
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
						{data == "Client is Ready!" ? null : (
							<>
								<QRCode value={data} />
								<br />
							</>
						)}
						<Paragraph className="text-left font-bold">{data}</Paragraph>
					</>
				)}
			</div>
			{/* <p>{JSON.stringify(data)}</p> */}
			{data == "Client is Ready!" ? null : (
				<>
					<div>
						<button
							onClick={handleClick}
							className="bg-slate-800 text-white rounded-md px-4 py-2">
							Refresh QR Code
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default QRCodeContainer;
