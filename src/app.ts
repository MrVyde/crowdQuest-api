//server setup
import express from "express";
import cors from "cors";

import imageRoutes from "./routes/image.routes";
import sessionRoutes from "./routes/session.routes";
import leaderboardRoutes from "./routes/leaderboard.routes";
import checkhitroutes from "./routes/checkhit.routes";

const app = express();

// Route
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());


app.use("/api/images", imageRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/validation", checkhitroutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;