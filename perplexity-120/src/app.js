
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ─── Routes ──────────────────────────────────────────────────────────────────
// TODO: import and mount your route files here
// import userRouter from "./routes/user.routes.js";
// app.use("/api/v1/users", userRouter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is up and running 🚀" });
});

app.use("/api/auth", authRouter);

export { app };
