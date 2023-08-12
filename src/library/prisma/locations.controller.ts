import { toast } from "@/components/ui/Toast";
import prisma from ".";

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

export async function createLocation(address: string, details: string, userId: string, userName: string) {
	try {
		const locationFromDB = await prisma.locations.create({
			data: { address, details, userId, userName },
		});
		toast({
			title: "Location Created",
			message: "New location created successfully",
			type: "success",
		});
		return { location: locationFromDB };
	} catch (error) {
		toast({
			title: "Something Wrong! Create Location Failed",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}

export async function getLocations() {
	try {
		const locations = await prisma.locations.findMany();
		return { locations };
	} catch (error) {
		return { error };
	}
}

export async function getLocationById(id: string) {
	try {
		const location = await prisma.locations.findUnique({ where: { id } });
		return { location };
	} catch (error) {
		return { error };
	}
}

export async function updateLocation(id: string, address: string, details: string) {
	try {
		const location = await prisma.locations.update({
			where: {
				id,
			},
			data: {
				address,
				details,
			},
		});
		toast({
			title: "Location Updated",
			message: "Location data updated successfully",
			type: "success",
		});
		return { location };
	} catch (error) {
		toast({
			title: "Something Wrong! Failed to update",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}

export async function deleteLocation(id: string) {
	try {
		try {
			const res = await prisma.locations.delete({
				where: {
					id,
				},
			});
			toast({
				title: "Location Deleted",
				message: "Location has been deleted",
				type: "success",
			});
			return { res, message: "Location has been deleted" };
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
