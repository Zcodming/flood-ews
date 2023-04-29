"use client";

import { signIn } from "next-auth/react";
import { useRef } from "react";
import TextBox from "@/ui/TextBox";
import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";

const CredentialsForm = () => {
	const userName = useRef("");
	const password = useRef("");

	const onSubmit = async () => {
		try {
			await signIn("credentials", {
				username: userName.current,
				password: password.current,
				redirect: true,
				callbackUrl: "/dashboard",
			});
		} catch (error) {
			toast({
				title: "Error",
				message: "There was an error login in",
				type: "error",
			});
		}
	};

	return (
		<>
			<TextBox lableText="Username" onChange={(e) => (userName.current = e.target.value)} />
			<TextBox
				lableText="Password"
				type={"password"}
				onChange={(e) => (password.current = e.target.value)}
			/>
			<Button variant={"default"} onClick={onSubmit}>
				Login
			</Button>
		</>
	);
};

export default CredentialsForm;
