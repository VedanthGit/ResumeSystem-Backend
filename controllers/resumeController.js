import fs, { rmSync } from "fs";
import Resume from "../models/Resume.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createResume = async (req, res) => {
	try {
		const { title } = req.body;

		const defaultResumeData = {
			profileInfo: {
				profileImg: null,
				previewUrl: "",
				fullName: "",
				designation: "",
				summary: "",
			},
			contactInfo: {
				email: "",
				phone: "",
				location: "",
				linkedin: "",
				github: "",
				website: "",
			},
			workExperience: [
				{
					company: "",
					role: "",
					startDate: "",
					endDate: "",
					description: "",
				},
			],
			education: [
				{
					degree: "",
					institution: "",
					startDate: "",
					endDate: "",
				},
			],
			skills: [
				{
					name: "",
					progress: 0,
				},
			],
			projects: [
				{
					title: "",
					description: "",
					github: "",
					liveDemo: "",
				},
			],
			certifications: [
				{
					title: "",
					issuer: "",
					year: "",
				},
			],
			languages: [
				{
					name: "",
					progress: 0,
				},
			],
			interests: [""],
		};

		const newResume = await Resume.create({
			userId: req.user._id,
			title,
			...defaultResumeData,
		});
		res.status(201).json(newResume);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch resumes", error: error.message });
	}
};

const getUserResumes = async (req, res) => {
	try {
		const resumes = await Resume.find({ userId: req.user._id }).sort({
			updatedAt: -1,
		});
		res.json(resumes);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch resumes", error: error.message });
	}
};

const getResumeById = async (req, res) => {
	try {
		const resume = await Resume.findOne({
			_id: req.params.id,
			userId: req.user._id,
		});

		if (!resume) {
			return res.status(404).json({ message: "Resume not found" });
		}

		res.json(resume);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch resumes", error: error.message });
	}
};

const updateResume = async (req, res) => {
	try {
		const resume = await Resume.findOne({
			_id: req.params.id,
			userId: req.user._id,
		});
		if (!resume) {
			return res
				.status(404)
				.json({ message: "Resume not found or unauthorized" });
		}
		Object.assign(resume, req.body);

		const savedResume = await resume.save();

		res.json(savedResume);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch resumes", error: error.message });
	}
};

const deleteResume = async (req, res) => {
	try {
		const resume = await Resume.findOne({
			_id: req.params.id,
			userId: req.user._id,
		});
		if (!resume) {
			return res
				.status(404)
				.json({ message: "Resume not found or unauthorized" });
		}

		const uploadFolder = path.join(__dirname, "..", "uploads");
		const baseUrl = `${req.protocol}://${req.get("host")}`;
		if (resume.thumbnailLink) {
			const oldThumbnail = path.join(
				uploadFolder,
				path.basename(resume.thumbnailLink)
			);
			if (fs.existsSync(oldThumbnail)) {
				fs.unlinkSync(oldThumbnail);
			}
		}

		if (resume.profileInfo?.profilePreviewUrl) {
			const oldProfile = path.join(
				uploadFolder,
				path.basename(resume.profileInfo.profilePreviewUrl)
			);
			if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
		}

		const deleted = await Resume.findOneAndDelete({
			_id: req.params.id,
			userId: req.user._id,
		});
		if (!deleted) {
			return res
				.status(404)
				.json({ message: "Resume not found or unathorized" });
		}

		res.json({ message: "Resume deleted successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch resumes", error: error.message });
	}
};

export {
	createResume,
	getUserResumes,
	getResumeById,
	updateResume,
	deleteResume,
};
