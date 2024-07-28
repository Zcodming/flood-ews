import axios from "axios";
import { Request, Response } from "express";

// error message function for unknown variable error
function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

const handler = async (req: Request, res: Response) => {
	if (req.method === "POST") {
		try {
			const data = req.body;
			console.log("Post Data: ", JSON.stringify(data));
			// console.log("Message: ", message);
			const done = await axios.post("https://spota.untan.ac.id/steven/zahwa_send_notif.php", {data: JSON.stringify(data)} , {
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
			console.log("Message Sent: ", done.data);
			return res.status(200).json(done.data);
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	res.setHeader("Allow", ["GET", "POST", "PUT"]);
	res.status(425).end(`Method  ${req.method} is not allowed.`);
};

export default handler;