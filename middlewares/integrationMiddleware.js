export const verifyExternalKey = (req, res, next) => {
	const providedKey = req.headers["x-api-key"];
	const validKey = process.env.EXTERNAL_API_KEY;

	if (!providedKey || providedKey !== validKey) {
		return res.status(401).json({ message: "Unauthorized: Invalid API Key" });
	}
	next();
};
