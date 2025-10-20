import express from "express";
import {
	createResume,
	deleteResume,
	getResumeById,
	getUserResumes,
	updateResume,
} from "../controllers/resumeController.js";
import { uploadResumeImages } from "../controllers/uploadImages.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.put("/:id/upload-images", protect, uploadResumeImages);

router.delete("/:id", protect, deleteResume);

export default router;
