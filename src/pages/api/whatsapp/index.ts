import { checkWhatsappSession, sendMessage } from "@/library/wa-webjs/whatsapp.controller";
import { Request, Response } from "express";

// error message function for unknown variable error
function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

const handler = async (req: Request, res: Response) => {
	if (req.method === "POST") {
		try {
			const message = req.body.message;
			const id = req.query.id as string;
			await sendMessage(message, id, res);
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}

	if (req.method === "GET" && !req.query.id) {
		try {
			await checkWhatsappSession(res);
		} catch (error) {
			return res.status(500).json({ error: getErrorMessage(error) });
		}
	}
	// if (req.method === "GET" && req.query.id) {
	// 	try {
	// 		const id = req.query.id as string;
	// 		await loginWhatsapp(res);
	// 	} catch (error) {
	// 		return res.status(500).json({ error: getErrorMessage(error) });
	// 	}
	// }
};

export default handler;
