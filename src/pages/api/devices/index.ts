import {
	createDevice,
	deleteDevice,
	getDeviceById,
	getDevices,
	updateDevice,
} from "@/library/prisma/devices.controller";
import { Request, Response } from "express";

// error message function for unknown variable error
function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

const handler = async (req: Request, res: Response) => {
	// ------------------------------------
	// * Users API Route
	// ------------------------------------
	//
	// get all request data
	// run function to create new user
	if (req.method === "POST") {
		try {
			const deviceName = req.body.deviceName;
			const channelId = req.body.channelId;
			const field = req.body.field;
			const userId = req.body.userId;
			const locationId = req.body.locationId;
			const deviceAddress = req.body.deviceAddress;
			const { device, error } = await createDevice(
				deviceName,
				channelId,
				field,
				userId,
				locationId,
				deviceAddress
			);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ device });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// run function to get all user
	if (req.method === "GET" && !req.body.id) {
		try {
			const { devices, error } = await getDevices();
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ devices });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// bring id user
	// run function to get user by id
	if (req.method === "GET" && req.body.id) {
		try {
			const id = req.body.id;
			const { device, error } = await getDeviceById(id);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ device });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// get id, name and email from request
	// run function to update user data by id
	if (req.method === "PUT") {
		try {
			const id = req.body.id;
			const address = req.body.address;
			const details = req.body.details;
			const { device, error } = await updateDevice(id, address, details);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ device });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// get id from request
	// run function to delete user by id
	if (req.method === "DELETE") {
		try {
			const id = req.body.id;
			const { error } = await deleteDevice(id);

			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ message: "User has been deleted!" });
		} catch (error) {
			return res.status(405).json({ error: getErrorMessage(error) });
		}
	}

	res.setHeader("Allow", ["GET", "POST", "PUT"]);
	res.status(425).end(`Method  ${req.method} is not allowed.`);
};

export default handler;
