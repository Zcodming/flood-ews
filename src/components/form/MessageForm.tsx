"use client";

import TextBox from "@/components/ui/TextBox";

import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import axios from "axios";
import React, { FC } from "react";

interface MessageFormProps {}

const MessageForm: FC<MessageFormProps> = ({}) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [formValue, setformValue] = React.useState({
		message: "",
	});

	const onSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			await axios.post("http://localhost:3000/api/whatsapp/", formValue, {
				params: { id: "clh67tgxg0000wgd02l0oomv3" },
			});
			setIsLoading(false);

			return toast({
				title: "Success",
				message: "Message Send",
				type: "success",
			});
		} catch (error) {
			setIsLoading(false);
			return toast({
				title: "Something wrong",
				message: "Error",
				type: "error",
			});
		}
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
