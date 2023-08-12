import { toast } from "@/components/ui/Toast";
import prisma from ".";

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

export async function createStaf(
	name: string,
	phoneNumber: string,
	details: string,
	locationId: string,
	stafLocation: string
) {
	try {
		const stafFromDB = await prisma.staf.create({
			data: { name, phoneNumber, details, locationId, stafLocation },
		});
		toast({
			title: "Staf Added",
			message: "New Staf added successfully",
			type: "success",
		});
		return { staf: stafFromDB };
	} catch (error) {
		toast({
			title: "Something Wrong! Failed Adding Staf",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}

export async function getStaf() {
	try {
		const staf = await prisma.staf.findMany();
		return { staf };
	} catch (error) {
		return { error };
	}
}

export async function getStafById(id: string) {
	try {
		const staf = await prisma.staf.findUnique({ where: { id } });
		return { staf };
	} catch (error) {
		return { error };
	}
}

export async function updateStaf(id: string, name: string, phoneNumber: string, details: string) {
	try {
		const staf = await prisma.staf.update({
			where: {
				id,
			},
			data: {
				name,
				phoneNumber,
				details,
			},
		});
		toast({
			title: "staf Updated",
			message: "staf data updated successfully",
			type: "success",
		});
		return { staf };
	} catch (error) {
		toast({
			title: "Something Wrong! Failed to update",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}

export async function deleteStaf(id: string) {
	try {
		try {
			const res = await prisma.staf.delete({
				where: {
					id,
				},
			});
			toast({
				title: "staf Deleted",
				message: "staf has been deleted",
				type: "success",
			});
			return { res, message: "staf has been deleted" };
		} catch (error) {
			return { error };
		}
	} catch (error) {
		toast({
			title: "Something Wrong! Failed to delete",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}
