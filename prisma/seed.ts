import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
	const password = await bcrypt.hashSync("12345678", 10);

// # ------------------------
// # User Seed
// # ------------------------
	const Admin = await prisma.user.upsert({
		where: { email: "admin@gmail.com" },
		update: {},
		create: {
			email: "admin@gmail.com",
			name: "Super Admin",
			username: "admin",
			role: "ADMIN",
			password,
		},
	});
	const User1 = await prisma.user.upsert({
		where: { email: "bpbdMPW@gmail.com" },
		update: {},
		create: {
			email: "bpbdMPW@gmail.com",
			name: "Admin Mempawah",
			username: "bpbdMPW",
			role: "USER",
			password,
		},
	});
	const User2 = await prisma.user.upsert({
		where: { email: "bpbdSTG@gmail.com" },
		update: {},
		create: {
			email: "bpbdSTG@gmail.com",
			name: "Admin Sintang",
			username: "bpbdSTG",
			role: "USER",
			password,
		},
	});

// # ------------------------
// # Location Seed
// # ------------------------
	const LocationMPW1 = await prisma.locations.upsert({
		where: { address: "Jl. Daeng Manambon, Kampung Tengah, RT. 01, RW. 01" },
		update: {},
		create: {
			address: "Jl. Daeng Manambon, Kampung Tengah, RT. 01, RW. 01",
			province: "Kalimantan Barat",
			regency: "Mempawah",
			city: "Mempawah Hilir",
			user: {
				connect: { email: "bpbdMPW@gmail.com" },
			},
		},
	});
	const LocationMPW2 = await prisma.locations.upsert({
		where: { address: "Jl. Gusti Sulung Lelanang, Desa Pasir, RT. 03, RW. 04" },
		update: {},
		create: {
			address: "Jl. Gusti Sulung Lelanang, Desa Pasir, RT. 03, RW. 04",
			province: "Kalimantan Barat",
			regency: "Mempawah",
			city: "Mempawah Hilir",
			user: {
				connect: { email: "bpbdMPW@gmail.com" },
			},
		},
	});
	const LocationSTG1 = await prisma.locations.upsert({
		where: { address: "Jl. Teuku Umar, Ladang, RT. 01, RW. 01" },
		update: {},
		create: {
			address: "Jl. Teuku Umar, Ladang, RT. 01, RW. 01",
			province: "Kalimantan Barat",
			regency: "Sintang",
			city: "Sintang",
			user: {
				connect: { email: "bpbdSTG@gmail.com" },
			},
		},
	});
	const LocationSTG2 = await prisma.locations.upsert({
		where: { address: "Jl. MT. Haryono, Kapuas Kanan Hulu, RT. 01, RW. 01" },
		update: {},
		create: {
			address: "Jl. MT. Haryono, Kapuas Kanan Hulu, RT. 01, RW. 01",
			province: "Kalimantan Barat",
			regency: "Sintang",
			city: "Sintang",
			user: {
				connect: { email: "bpbdSTG@gmail.com" },
			},
		},
	});

// # ------------------------
// # Device Seed
// # ------------------------	
	const DeviceMPW1 = await prisma.devices.upsert({
		where: { deviceName: "MPW-1858724-1" },
		update: {},
		create: {
			deviceName: "MPW-1858724-1",
			channel: 1858724,
			field: 1,
			location: {
				connect: { address: "Jl. Daeng Manambon, Kampung Tengah, RT. 01, RW. 01" },
			},
			user: { connect: { email: "bpbdMPW@gmail.com" },
			},
		},
	});
	const DeviceMPW2 = await prisma.devices.upsert({
		where: { deviceName: "MPW-1858724-2" },
		update: {},
		create: {
			deviceName: "MPW-1858724-2",
			channel: 1858724,
			field: 2,
			location: {
				connect: { address: "Jl. Gusti Sulung Lelanang, Desa Pasir, RT. 03, RW. 04" },
			},
			user: { connect: { email: "bpbdMPW@gmail.com" },
			},
		},
	});
	const DeviceSTG1 = await prisma.devices.upsert({
		where: { deviceName: "STG-1858724-3" },
		update: {},
		create: {
			deviceName: "STG-1858724-3",
			channel: 1858724,
			field: 3,
			location: {
				connect: { address: "Jl. Teuku Umar, Ladang, RT. 01, RW. 01" },
			},
			user: { connect: { email: "bpbdSTG@gmail.com" },
			},
		},
	});
	const DeviceSTG2 = await prisma.devices.upsert({
		where: { deviceName: "STG-1858724-4" },
		update: {},
		create: {
			deviceName: "STG-1858724-4",
			channel: 1858724,
			field: 4,
			location: {
				connect: { address: "Jl. MT. Haryono, Kapuas Kanan Hulu, RT. 01, RW. 01" },
			},
			user: { connect: { email: "bpbdSTG@gmail.com" },
			},
		},
	});

// # ------------------------
// # DevicePosition Seed
// # ------------------------	
	const DevicePositionMPW1 = await prisma.devicePosition.upsert({
		where: { deviceName: DeviceMPW1.deviceName },
		update: {},
		create: {
			device: { connect: { deviceName: DeviceMPW1.deviceName } },
			latitude: 0.343656,
			longitude: 108.963964,
		},
	});
	const DevicePositionMPW2 = await prisma.devicePosition.upsert({
		where: { deviceName: DeviceMPW2.deviceName },
		update: {},
		create: {
			device: { connect: { deviceName: DeviceMPW2.deviceName } },
			latitude: 0.388206,
			longitude: 108.959852,
		},
	});
	// const DevicePositionSTG1 = await prisma.devicePosition.upsert({
	// 	where: { deviceId: DeviceSTG1.id },
	// 	update: {},
	// 	create: {
	// 		device: { connect: { deviceName: DeviceSTG1.deviceName } },
	// 		latitude: 0.343656,
	// 		longitude: 108.963964,
	// 	},
	// });
	// const DevicePositionSTG2 = await prisma.devicePosition.upsert({
	// 	where: { deviceId: DeviceSTG2.id },
	// 	update: {},
	// 	create: {
	// 		device: { connect: { deviceName: DeviceSTG2.deviceName } },
	// 		latitude: 0.388206,
	// 		longitude: 108.959852,
	// 	},
	// });

// # ------------------------
// # Contact Seed
// # ------------------------	
	const ContactMPW1 = await prisma.contact.upsert({
		where: { waNumber: "6281345222156" },
		update: {},
		create: {
			name: "Ezhaa Setiawan",
			waNumber: "6281345222156",
			description: "Admin Kelurahan Kampung Tengah",
			user: { 
				connect: { email: "bpbdMPW@gmail.com" },
			},
			location: {
				connect: { address: "Jl. Daeng Manambon, Kampung Tengah, RT. 01, RW. 01" },
			},
			device: {
				connect: { deviceName: DeviceMPW1.deviceName },
			}
		},
	});
	const ContactMPW2 = await prisma.contact.upsert({
		where: { waNumber: "62895346793826" },
		update: {},
		create: {
			name: "Zahwa Tri Riyanto",
			waNumber: "62895346793826",
			description: "Admin Kelurahan Desa Pasir",
			user: { 
				connect: { email: "bpbdMPW@gmail.com" },
			},
			location: {
				connect: { address: "Jl. Gusti Sulung Lelanang, Desa Pasir, RT. 03, RW. 04" },
			},
			device: {
				connect: { deviceName: DeviceMPW2.deviceName },
			}
		},
	});

	console.log({ 
		Admin, User1, User2, LocationMPW1, LocationMPW2, LocationSTG1, LocationSTG2, DeviceMPW1, DeviceMPW2, DeviceSTG1, DeviceSTG2, DevicePositionMPW1, DevicePositionMPW2, ContactMPW1, ContactMPW2 
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
