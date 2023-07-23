import { createStaf, deleteStaf, getStafById, getStaf, updateStaf } from "@/library/prisma/staf.controller";
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
			const name = req.body.name;
			const phoneNumber = req.body.phoneNumber;
			const details = req.body.details;
			const locationId = req.body.locationId;
			const stafLocation = req.body.stafLocation;
			const { staf, error } = await createStaf(name, phoneNumber, details, locationId, stafLocation);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ staf });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// run function to get all user
	if (req.method === "GET" && !req.body.id) {
		try {
			const { staf, error } = await getStaf();
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ staf });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// bring id user
	// run function to get user by id
	if (req.method === "GET" && req.body.id) {
		try {
			const id = req.body.id;
			const { staf, error } = await getStafById(id);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ staf });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// get id, name and email from request
	// run function to update user data by id
	if (req.method === "PUT") {
		try {
			const id = req.body.id;
			const name = req.body.name;
			const phoneNumber = req.body.phoneNumber;
			const details = req.body.details;
			const { staf, error } = await updateStaf(id, name, phoneNumber, details);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ staf });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// get id from request
	// run function to delete user by id
	if (req.method === "DELETE") {
		try {
			const id = req.body.id;
			const { error } = await deleteStaf(id);

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
