"use client";

import TextBox from "@/components/ui/TextBox";
import { User } from "@prisma/client";

import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import axios from "axios";
import React, { FC } from "react";

type ModifiedRequestType<K extends keyof User> = Omit<User, K> & {
	createAt: string;
	updateAt: string;
};

interface LocationFormProps {
	userRequests: ModifiedRequestType<"createAt" | "updateAt">[];
}

const LocationForm: FC<LocationFormProps> = ({ userRequests }) => {
	const [formValue, setformValue] = React.useState({
		address: "",
		details: "",
		userId: "",
		userName: "",
	});

	const onSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			await axios.post("http://localhost:3000/api/locations/", formValue);

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

	const getValue = (event: { target: { name: any; value: any } }) => {
		let array = event.target.value.split(",");
		let value1 = array[0];
		let value2 = array[1];

		setformValue({
			...formValue,
			userId: value1,
			userName: value2,
		});
	};

	return (
		<div className="px-8 py-6">
			<form action="" method="post">
				<TextBox
					lableText="Address"
					name="address"
					value={formValue.address}
					onChange={handleChange}
				/>
				<TextBox
					lableText="Details"
					name="details"
					value={formValue.details}
					onChange={handleChange}
				/>
				<div className="relative">
					<label>Designate User</label>
					<div className="flex items-stretch">
						<select
							name="userId"
							id="userId"
							onChange={getValue}
							className="dark: bg-white h-8 w-full rounded-md">
							{userRequests.map((users: any) => (
								<option value={users.id + "," + users.name} key={users.id}>
									{users.name + " : " + users.id}
								</option>
							))}
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

export default LocationForm;
