import { toast } from "@/components/ui/Toast";
import prisma from ".";

// error message function for unknown variable error
function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

// create new user to users table
export async function createUser(user: string) {
	try {
		const userFromDB = await prisma.user.create({ data: user });
		toast({
			title: "User Created",
			message: "New user created successfully",
			type: "success",
		});
		return { user: userFromDB };
	} catch (error) {
		toast({
			title: "Something Wrong! Create User Failed",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}

// find all user from users table
export async function getUsers() {
	try {
		const users = await prisma.user.findMany();
		return { users };
	} catch (error) {
		return { error };
	}
}

// find specific user from users table
export async function getUserById(id: string) {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		return { user };
	} catch (error) {
		return { error };
	}
}

//
export async function updateUser(id: string, name: string, email: string, password: string) {
	try {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				password,
			},
		});
		toast({
			title: "User Updated",
			message: "User data updated successfully",
			type: "success",
		});
		return { user };
	} catch (error) {
		toast({
			title: "Something Wrong! Failed to update",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}

export async function deleteUser(id: string) {
	try {
		// check if selected user id is current user login
		const accData = await prisma.account.findUnique({
			where: {
				userId: id,
			},
			select: {
				userId: true,
			},
		});

		// if selected user not login then delete
		if (!accData) {
			try {
				const res = await prisma.user.delete({
					where: {
						id,
					},
				});
				toast({
					title: "User Deleted",
					message: "User has been deleted",
					type: "success",
				});
				return { res, message: "User has been deleted" };
			} catch (error) {
				return { error };
			}
		}

		const loginUser = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				name: true,
			},
		});

		toast({
			title: "Delete User Failed",
			message: `Cannot delete this user! ${loginUser?.name} currently login`,
			type: "error",
		});
		return { error: `Cannot delete this user! ${loginUser?.name} currently login` };
	} catch (error) {
		toast({
			title: "Something Wrong! Failed to delete",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}
