import dotenv from "dotenv";

// Load env vars FIRST before anything else
dotenv.config({ path: "./.env" });

import connectDB from "./src/config/database.js";
import { app } from "./src/app.js";

const PORT = process.env.PORT || 8000;

// Connect to MongoDB, then start the Express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });