declare global {
	var client = new Client({
		puppeteer: {
			// Change this to true if you want to run in headless mode
			headless: true,
			args: ["--no-sandbox"],
		},
		authStrategy: new LocalAuth({
			clientId: "clh67tgxg0000wgd02l0oomv3",
		}),
	});
}
