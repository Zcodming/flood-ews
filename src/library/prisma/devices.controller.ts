import { toast } from "@/components/ui/Toast";
import prisma from ".";

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

export async function createDevice(
	deviceName: string,
	channelId: string,
	field: number,
	userId: string,
	locationId: string,
	deviceAddress: string
) {
	try {
		const deviceFromDB = await prisma.devices.create({
			data: { deviceName, channelId, field, userId, deviceAddress, locationId },
		});
		toast({
			title: "Device Added",
			message: "New device added successfully",
			type: "success",
		});
		return { device: deviceFromDB };
	} catch (error) {
		toast({
			title: "Something Wrong! Adding Device Failed",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}

export async function getDevices() {
	try {
		const devices = await prisma.devices.findMany();
		return { devices };
	} catch (error) {
		return { error };
	}
}

export async function getDeviceById(id: string) {
	try {
		const device = await prisma.devices.findUnique({ where: { id } });
		return { device };
	} catch (error) {
		return { error };
	}
}

export async function updateDevice(
	id: string,
	deviceName: string,
	channelId: string,
	field: number,
	userId: string,
	locationId: string,
	deviceAddress: string
) {
	try {
		const device = await prisma.devices.update({
			where: {
				id,
			},
			data: {
				deviceName,
				channelId,
				field,
				userId,
				deviceAddress,
				locationId,
			},
		});
		toast({
			title: "Device Updated",
			message: "Device data updated successfully",
			type: "success",
		});
		return { device };
	} catch (error) {
		toast({
			title: "Something Wrong! Failed to update",
			message: getErrorMessage(error),
			type: "error",
		});
		return { error };
	}
}

export async function deleteDevice(id: string) {
	try {
		try {
			const res = await prisma.devices.delete({
				where: {
					id,
				},
			});
			toast({
				title: "Device Deleted",
				message: "Device has been deleted",
				type: "success",
			});
			return { res, message: "Device has been deleted" };
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
