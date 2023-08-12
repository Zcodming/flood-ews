"use client";

import TextBox from "@/components/ui/TextBox";
import { Locations } from "@prisma/client";

import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import axios from "axios";
import React, { FC } from "react";

type ModifiedRequestType<K extends keyof Locations> = Omit<Locations, K> & {
	createAt: string;
	updateAt: string;
};

interface StafFormProps {
	locationsRequests: ModifiedRequestType<"createAt" | "updateAt">[];
}

const StafForm: FC<StafFormProps> = ({ locationsRequests }) => {
	const [formValue, setformValue] = React.useState({
		name: "",
		details: "",
		phoneNumber: "",
		locationId: "",
		stafLocation: "",
	});

	const onSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			await axios.post("http://localhost:3000/api/staf/", formValue);

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
			locationId: value1,
			stafLocation: value2,
		});
	};

	return (
		<div className="px-8 py-6">
			<form action="" method="post">
				<TextBox lableText="Name" name="name" value={formValue.name} onChange={handleChange} />
				<TextBox
					lableText="Phone Number"
					name="phoneNumber"
					placeholder="+628*******"
					type="number"
					value={formValue.phoneNumber}
					onChange={handleChange}
				/>
				<div className="relative">
					<label>Staf Location</label>
					<div className="flex items-stretch">
						<select
							name="locationsId"
							id="locationsId"
							onChange={getValue}
							className="dark: bg-white h-8 w-full rounded-md">
							{locationsRequests.map((locations: any) => (
								<option value={locations.id + "," + locations.address} key={locations.id}>
									{locations.address + " : " + locations.id}
								</option>
							))}
						</select>
					</div>
				</div>
				<TextBox
					lableText="Details"
					name="details"
					value={formValue.details}
					onChange={handleChange}
				/>

				<Button className="items-end justify-center mt-6" variant={"green"} onClick={onSubmit}>
					<span>Save</span>
				</Button>
				{/* <div className="relative text-white">{JSON.stringify(data)}</div> */}
			</form>
		</div>
	);
};

export default StafForm;
