const { Client, LocalAuth } = require("whatsapp-web.js");

// const client = new Client();
const client = new Client({
	puppeteer: {
		// Change this to true if you want to run in headless mode
		headless: true,
		args: ["--no-sandbox"],
	},
	qrMaxReries: 10,
	authStrategy: new LocalAuth({
		clientId: "client-admin",
		backupSyncIntervalMs: 60000, // [Default: 3600000] Interval at which to sync the backup, in milliseconds
	}),
});

export default client;
