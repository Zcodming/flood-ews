"use client";

import TextBox from "@/components/ui/TextBox";

import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface MessageFormProps {}

const MessageForm: FC<MessageFormProps> = ({}) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [formValue, setformValue] = React.useState({
		message: "",
	});
	const [response, setResponse] = React.useState("");

	const router = useRouter();

	const onSubmit = async () => {
		setIsLoading(true);

		await axios
			.post(
				"http://localhost:3000/chat/sendmessage/62895346793826",
				{
					message: "Hello World",
				}
				// formValue
				// , {
				// 	params: { phone: "62895346793826" }, // Phone Number
				// 	params: { id: "clh67tgxg0000wgd02l0oomv3" }, // Admin
				// 	params: { id: "clhz0whei0000wgxsjfq0i3wi" }, // user Ptk
				// }
			)
			.then((response) => {
				setResponse(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});

		setIsLoading(false);
	};

	const handleChange = (event: { target: { name: any; value: any } }) => {
		setformValue({
			...formValue,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div className="px-8 py-6">
			<form action="" method="post">
				<div className="flex flex-warp gap-4">
					<TextBox
						lableText="Message Template"
						className="w-1/2"
						name="message"
						type="text"
						value={formValue.message}
						onChange={handleChange}
					/>
				</div>
				<Button
					className="items-end justify-center mt-6"
					variant={"green"}
					onClick={onSubmit}
					isLoading={isLoading}>
					<span>Send Message</span>
				</Button>
				{/* <div className="relative text-white">{JSON.stringify(data)}</div> */}
			</form>
		</div>
	);
};

export default MessageForm;
