const { Client, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
var path = require("path");

const allSessionObject = {};

const authStrategy = new LocalAuth({
	clientId: "adminSession",
});

export async function checkWhatsappSession(res: any) {
	fs.readFile("/src/components/last.qr", (err: any, last_qr: any) => {
		if (!err && last_qr) {
			console.log("Success : ", last_qr);
			res.status(200).send({ last_qr });
			res.end();
		}
	});
	res.status(200).send({ message: "You need to login first" });
	res.end();
}
// export async function checkWhatsappSession(res: any) {
// 	const dir = "./waSession.json";
// 	console.log("Checking session...");
// 	await fs.readFile(dir, "utf8", function (err: any, data: any) {
// 		if (err) throw err;
// 		console.log(data);
// 		if (data.length === 0) {
// 			return res.status(200).json("You need to login first");
// 		} else {
// 			return res.status(200).json("You are logged in.");
// 		}
// 	});
// }

// export async function loginWhatsapp(res: any) {
// 	try {
// 		client.on("qr", (qr: any) => {
// 			console.log("QR RECEIVED", qr);
// 			res.status(200).send({
// 				message: "Connect whatsapp with this qr-code",
// 				qrCode: qr,
// 			});
// 		});
// 		await client.initialize();
// 		res.status(404);
// 	} catch (err) {
// 		res.send(err);
// 	}
// }

export async function sendMessage(message: string, id: string, res: any) {
	try {
		const client = new Client({
			takeoverOnConflict: true,
			puppeteer: {
				// Change this to true if you want to run in headless mode
				headless: true,
				args: ["--no-sandbox"],
			},
			clientId: "adminSession",
		});

		let phoneNumber = "62895346793826";

		console.log("Ready.....", id);
		console.log("With Message", message);

		// await new Promise((resolve) => {
		client.on("ready", () => {
			if (phoneNumber.startsWith("0")) {
				phoneNumber = "62" + phoneNumber.slice(1) + "@c.us";
			} else if (phoneNumber.startsWith("+")) {
				phoneNumber = phoneNumber.slice(1) + "@c.us";
			} else {
				phoneNumber = phoneNumber + "@c.us";
			}

			const user = client.isRegisteredUser(phoneNumber);
			console.log("Checking");

			if (user) {
				client.sendMessage(phoneNumber, message);
				console.log("Message Sent", message);
				console.log("Nomor HP : ", phoneNumber);
				console.log("Pesan : ", message);
				// 			resolve();
				// 			// res.status(200).json({ message: "Message send successfully" });
			} else {
				throw new Error("Nomor HP belum terdaftar");
			}
			// 	});
			// 	setTimeout(() => resolve(), 30000);
		});

		await client.initialize();

		res.send("Message send successfully");
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}
