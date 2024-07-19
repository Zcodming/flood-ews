const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { Server } = require("socket.io");
const fs = require("fs");
const { send } = require("process");

const dev = process.env.NODE_ENV !== "production";
const hostname = "127.0.0.1";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = createServer(async (req, res) => {
		try {
			// Be sure to pass `true` as the second argument to `url.parse`.
			// This tells it to parse the query portion of the URL.
			const parsedUrl = parse(req.url, true);
			const { pathname, query } = parsedUrl;

			if (pathname === "/a") {
				await app.render(req, res, "/a", query);
			} else if (pathname === "/b") {
				await app.render(req, res, "/b", query);
			} else {
				await handle(req, res, parsedUrl);
			}
		} catch (err) {
			console.error("Error occurred handling", req.url, err);
			res.statusCode = 500;
			res.end("internal server error");
		}
	}).once("error", (err) => {
		console.error(err);
		process.exit(1);
	});

	const io = new Server(server, { path: "/src/app/(dashboard)/socket.io" });

	const authStrategy = new LocalAuth({
		clientId: "adminSession",
	});

	const client = new Client({
		takeoverOnConflict: true,
		qrMaxRetries: 6,
		puppeteer: {
			// Change this to true if you want to run in headless mode
			headless: true,
			args: ["--no-sandbox"],
		},
		authStrategy,
	});

	const sessionData = {
		client: "admin",
		session: true,
		qrCodeScanned: true,
	};

	const createWhatsappSession = async (socket) => {
		client.on("qr", (qr) => {
			console.log("QR Generated : ", qr);
			socket.emit("qr", { qr });
		});

		client.initialize();
	};

	client.on("authenticated", (session) => {
		console.log("Authenticated");
	});

	client.on("message", (message) => {
		if (message.body === "hai") {
			client.sendMessage(message.from, "halo juga");
		}
	});

	const sendResponse = (title, notify, status, socket) => {
		socket.emit("message", {
			title: title,
			notification: notify,
			type: status,
		});
	};

	io.on("connection", (socket) => {
		console.log("a user connected");
		socket.on("disconnect", () => {
			console.log("user disconnected");
		});

		socket.on("connected", (data) => {
			console.log("Connected to server", data);
			socket.emit("Hello", "Hello from server");
		});

		socket.on("check-session", () => {
			checkWhatsappSession(socket);
		});

		socket.on("create-session", () => {
			createWhatsappSession(socket);
		});

		socket.on("send-message", (data) => {
			console.log("client message : ", data);
			const { phoneNumber, message } = data;
			// sendWhatsappMessage(phoneNumber, message, socket);

			sendResponse("Success", "Message sent", "success", socket);
		});
	});

	server.listen(port, hostname, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://${hostname}:${port}`);
	});
});
