import {
	createLocation,
	deleteLocation,
	getLocationById,
	getLocations,
	updateLocation,
} from "@/library/prisma/locations.controller";
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
			const address = req.body.address;
			const details = req.body.details;
			const userId = req.body.userId;
			const userName = req.body.userName;
			const { location, error } = await createLocation(address, details, userId, userName);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ location });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// bring id user
	// run function to get user by id
	if (req.method === "GET" && req.body) {
		try {
			const id = req.body.id;
			const { location, error } = await getLocationById(id);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ location });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// run function to get all user
	if (req.method === "GET" && !req.body.id) {
		try {
			const { locations, error } = await getLocations();
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ locations });
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
			const { location, error } = await updateLocation(id, address, details);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ location });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// get id from request
	// run function to delete user by id
	if (req.method === "DELETE") {
		try {
			const id = req.body.id;
			const { error } = await deleteLocation(id);

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
