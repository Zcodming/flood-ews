const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const qrcode = require("qrcode-terminal");

const config = require("./config.json");
const { Client, LocalAuth } = require("whatsapp-web.js");

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const hostname = "127.0.0.1";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

process.title = "whatsapp-node-api";

global.client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: { headless: true, args: ["--no-sandbox"] },
});

global.authed = false;

app.prepare()
	.then(() => {
		const server = express();

		server.get("*", (req, res) => {
			return handle(req, res);
		});

		//Set Request Size Limit 50 MB
		server.use(bodyParser.json({ limit: "50mb" }));

		server.use(express.json());
		server.use(bodyParser.urlencoded({ extended: true }));

		client.on("qr", (qr) => {
			console.log("qr : ", qr);
			qrcode.generate(qr, { small: true });
			fs.writeFileSync("./src/components/last.qr", qr);
		});

		client.on("authenticated", () => {
			console.log("AUTH!");
			authed = true;

			try {
				fs.unlinkSync("./src/components/last.qr");
			} catch (err) {}
		});

		client.on("auth_failure", () => {
			console.log("AUTH Failed !");
			process.exit();
		});

		client.on("ready", () => {
			console.log("Client is ready!");
		});

		client.on("message", async (msg) => {
			if (config.webhook.enabled) {
				if (msg.hasMedia) {
					const attachmentData = await msg.downloadMedia();
					msg.attachmentData = attachmentData;
				}
				axios.post(config.webhook.path, { msg });
			}
		});
		client.on("disconnected", () => {
			console.log("disconnected");
		});
		client.initialize();

		const chatRoute = require("./src/components/chatting");
		const groupRoute = require("./src/components/group");
		const authRoute = require("./src/components/auth");
		const contactRoute = require("./src/components/contact");

		server.use(function (req, res, next) {
			console.log(req.method + " : " + req.path);
			next();
		});
		server.use("/chat", chatRoute);
		server.use("/group", groupRoute);
		server.get("/auth", authRoute);
		server.use("/contact", contactRoute);

		server.listen(3000, (err) => {
			if (err) throw err;
			console.log("> Ready on http://localhost:3000");
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
