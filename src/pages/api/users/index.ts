import { createUser, deleteUser, getUserById, getUsers, updateUser } from "@/library/prisma/users.controller";
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
			const username = req.body.username;
			const email = req.body.email;
			const rawPassword = req.body.password;
			const role = req.body.role;
			const { user, error } = await createUser(name, username, email, rawPassword, role);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ user });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// run function to get all user
	// if (req.method === "GET" && !req.body.id) {
	// 	try {
	// 		const { users, error } = await getUsers();
	// 		if (error) throw new Error(getErrorMessage(error), { cause: error });
	// 		return res.status(200).json({ users });
	// 	} catch (error) {
	// 		return res.status(500).json({ error: getErrorMessage(error) });
	// 	}
	// }

	// bring id user
	// run function to get user by id
	if (req.method == "GET") {
		try {
			const id = req.query.id as string;
			const { user, error } = await getUserById(id);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ user });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// get id, name and email from request
	// run function to update user data by id
	if (req.method === "PUT") {
		try {
			const data = req.body;
			const { user, error } = await updateUser(data.id, data.name, data.email, data.password);
			if (error) throw new Error(getErrorMessage(error), { cause: error });
			return res.status(200).json({ user });
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	// get id from request
	// run function to delete user by id
	if (req.method === "DELETE") {
		try {
			const id = req.body.id;
			const { error } = await deleteUser(id);

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
