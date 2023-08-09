import { toast } from "@/components/ui/Toast";
import prisma from ".";
import { redirect } from "next/navigation";

const { Client, RemoteAuth, LocalAuth } = require("whatsapp-web.js");

const allSessionObject = <any>{};

export async function checkWhatsappSession(id: string, res: any) {
	// const store = await prisma.store.findUnique({});
	const client = new Client({
		puppeteer: {
			// Change this to true if you want to run in headless mode
			headless: true,
		},
		// qrMaxAttempts: 5, // [Default: 5] Max attempts to scan the QR code
		authStrategy: new LocalAuth({
			clientId: id,
			backupSyncIntervalMs: 60000, // [Default: 3600000] Interval at which to sync the backup, in milliseconds
			// store: Store, // Pass the instance of the Store here
		}), // This is required
	});

	client.on("qr", (qr: string) => {
		if (qr) {
			console.log("qrCode: ", qr);
			res.send(qr);
		}
		setTimeout(() => new Error("QR Code wasn't emitted in 30 seconds"), 30000);
	});

	client.on("ready", () => {
		console.log("Client is ready!");
	});

	client.initialize();
}

export async function sendMessage(message: string, id: string, res: any) {
	// let staf = prisma.staf.findMany({
	// 	select: {
	// 		phoneNumber: true,
	// 	},
	// });

	let phoneNumber: string;

	try {
		const client = new Client({
			puppeteer: {
				// Change this to true if you want to run in headless mode
				headless: true,
				args: ["--no-sandbox"],
			},
			authStrategy: new LocalAuth({
				clientId: id,
				backupSyncIntervalMs: 60000,
			}), // This is required
		});

		client.on("qr", (qr: string) => {
			redirect("/dashboard");
		});

		client.on("ready", async () => {
			// (await staf).map((list: any) => {
			phoneNumber = "62895346793826";

			if (phoneNumber.startsWith("0")) {
				phoneNumber = "62" + phoneNumber.slice(1) + "@c.us";
			} else if (phoneNumber.startsWith("+")) {
				phoneNumber = phoneNumber.slice(1) + "@c.us";
			} else {
				phoneNumber = phoneNumber + "@c.us";
			}

			const user = client.isRegisteredUser(phoneNumber);

			if (user) {
				client.sendMessage(phoneNumber, message);
				console.log("Nomor HP : ", phoneNumber);
				console.log("Pesan : ", message);
			} else {
				res.send("Failed to Send");
			}
			// });
		});

		client.initialize();

		return res.send("Successful");
	} catch (error: any) {
		console.log(error);
		res.send("Failed to Send");
	}
}
