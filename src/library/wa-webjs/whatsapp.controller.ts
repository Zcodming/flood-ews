import client from ".";
import fs from "fs";

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


export async function sendMessage(message: string, res: any) {
	try {
		let phoneNumber = "62895346793826";

		// console.log("Ready.....", id);
		console.log("With Message", message);

		// await new Promise((resolve) => {
		// if (client.on("ready")) {
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
		// }

		res.send("Message send successfully");
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}
