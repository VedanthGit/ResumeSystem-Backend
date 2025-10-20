import express from "express";
import { verifyExternalKey } from "../middlewares/integrationMiddleware.js";
import Resume from "../models/Resume.js";

const router = express.Router();

/**
 * @desc External API for updating user resume from other platforms
 * @route POST /api/integrations/add-achievement
 * @access External (API key protected)
 */
router.post("/add-achievement", verifyExternalKey, async (req, res) => {
	try {
		const { userId, title, description, year, platform } = req.body;

		if (!userId || !title) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const resume = await Resume.findOne({ userId });
		if (!resume) {
			return res
				.status(404)
				.json({ message: "Resume not found for this user" });
		}

		// Add to certifications or projects
		resume.certifications.push({
			title,
			issuer: platform || "External Platform",
			year: year || new Date().getFullYear(),
		});

		await resume.save();

		res.status(200).json({
			message: "Achievement added successfully from external source",
			updatedResume: resume,
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating resume", error: error.message });
	}
});

export default router;
