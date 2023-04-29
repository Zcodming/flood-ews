import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
	const password = await bcrypt.hashSync("12345678", 10);
	const Admin = await prisma.user.upsert({
		where: { email: "admin@gmail.com" },
		update: {},
		create: {
			email: "admin@gmail.com",
			name: "Admin",
			username: "admin",
			role: "ADMIN",
			password,
		},
	});
	const User = await prisma.user.upsert({
		where: { email: "user@gmail.com" },
		update: {},
		create: {
			email: "user@gmail.com",
			name: "User",
			username: "user",
			role: "USER",
			password,
		},
	});
	console.log({ Admin, User });
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
