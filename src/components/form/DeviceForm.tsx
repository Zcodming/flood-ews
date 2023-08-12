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

interface DeviceFormProps {
	locationRequests: ModifiedRequestType<"createAt" | "updateAt">[];
	locationId: string;
	address: string;
	userId: string;
}

const DeviceForm: FC<DeviceFormProps> = ({ locationRequests, locationId, address, userId }) => {
	const [formValue, setformValue] = React.useState({
		deviceName: "",
		channelId: "",
		field: 0,
		deviceAddress: address,
		locationId: locationId,
		userId: userId,
	});

	const onSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			await axios.post("http://localhost:3000/api/devices/", formValue);

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
				<div className="relative">
					<span>Location : {address}</span>
				</div>
				<TextBox
					lableText="Device Name"
					name="deviceName"
					value={formValue.deviceName}
					onChange={handleChange}
				/>
				<TextBox
					lableText="Channel ID"
					name="channelId"
					value={formValue.channelId}
					onChange={handleChange}
				/>
				<div className="relative">
					<label>Designate User</label>
					<div className="flex items-stretch">
						<select
							name="field"
							id="field"
							onChange={handleChange}
							className="dark: bg-white h-8 w-full rounded-md">
							<option value="1">Field 1</option>
							<option value="2">Field 2</option>
							<option value="3">Field 3</option>
							<option value="4">Field 4</option>
							<option value="5">Field 5</option>
							<option value="6">Field 6</option>
							<option value="7">Field 7</option>
							<option value="8">Field 8</option>
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

export default DeviceForm;
