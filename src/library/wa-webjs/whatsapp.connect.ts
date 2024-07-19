const { Client, LocalAuth } = require("whatsapp-web.js");
import fs from "fs";

// export async function checkWhatsappSession(res: any) {
// 	const dir = "./src/library/wa-webjs/last.qr";
// 	console.log("Checking session...");
// 	await fs.readFile(dir, "utf8", function (err: any, data: any) {
// 		if (err) throw err;
// 		console.log(data);
// 		if (data.length === 0) {
// 			return res.status(200).json("You need to login first");
// 		} else {
// 			return res.status(200).send({ data });
// 		}
// 	});
// }

export async function loginWhatsapp(res: any) {
	try {
		const client = new Client({
			puppeteer: {
				// Change this to true if you want to run in headless mode
				headless: true,
				args: ["--no-sandbox"],
			},
			qrMaxReries: 10,
			authStrategy: new LocalAuth({
				clientId: "client-admin",
				dataPath: './src/library/wa-webjs/webjs-auth',
				backupSyncIntervalMs: 60000, // [Default: 3600000] Interval at which to sync the backup, in milliseconds
			}),
		});

		client.on("qr", (qr: any) => {
			console.log("QR RECEIVED: ", qr);
            // fs.writeFileSync("./src/library/wa-webjs/last.qr", qr);
			res.send(qr);
		});

		res.send("You are logged in.")

	} catch (error) {
		res.send(error);
	}
}