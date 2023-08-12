"use client";

import TextBox from "@/components/ui/TextBox";
import { User } from "@prisma/client";

import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import axios from "axios";
import React, { FC } from "react";

interface UserFormProps {}

const UserForm: FC<UserFormProps> = ({}) => {
	const [formValue, setformValue] = React.useState({
		name: "",
		username: "",
		email: "",
		password: "",
		role: "USER",
	});

	const onSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			await axios.post("http://localhost:3000/api/users/", formValue);

			return toast({
				title: "Success",
				message: "Data Send",
				type: "success",
			});
		} catch (error) {
			toast({
				title: "Something wrong",
				message: "Error",
				type: "error",
			});
			console.log(error);
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
						lableText="Name"
						className="w-1/2"
						name="name"
						value={formValue.name}
						onChange={handleChange}
					/>
					<TextBox
						lableText="Username"
						className="w-1/2"
						name="username"
						value={formValue.username}
						onChange={handleChange}
					/>
				</div>
				<TextBox
					lableText="Email"
					name="email"
					type="email"
					value={formValue.email}
					onChange={handleChange}
				/>
				<TextBox
					lableText="Password"
					name="password"
					type="password"
					value={formValue.password}
					onChange={handleChange}
				/>
				<div className="relative">
					<label>User Role</label>
					<div className="flex items-stretch">
						<select
							name="role"
							id="role"
							onChange={handleChange}
							className="dark: bg-white h-8 w-full rounded-md">
							<option value="USER" key="user">
								User
							</option>
							<option value="ADMIN" key="admin">
								Admin
							</option>
						</select>
					</div>
				</div>

				<Button className="items-end justify-center mt-6" variant={"green"} onClick={onSubmit}>
					<span>Save</span>
				</Button>
				{/* <div className="relative text-white">{JSON.stringify(data)}</div> */}
			</form>
		</div>
	);
};

export default UserForm;
