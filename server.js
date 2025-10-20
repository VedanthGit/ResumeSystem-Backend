import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import integrationRoutes from "./routes/integrationRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
// ✅ Connect to MongoDB
connectDB();

const app = express();

// File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Explicit and secure CORS configuration
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true, // ← allows cookies/tokens to pass through
	})
);

// ✅ Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/integrations", integrationRoutes);

// ✅ Serve static files for uploads
app.use(
	"/uploads",
	express.static(path.join(__dirname, "uploads"), {
		setHeaders: (res, path) => {
			res.set(
				"Access-Control-Allow-Origin",
				process.env.CLIENT_URL || "http://localhost:5173"
			);
		},
	})
);

// ✅ Health Check Route
app.get("/", (req, res) => res.send("Resume Viewer Backend up and running 🚀"));

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
