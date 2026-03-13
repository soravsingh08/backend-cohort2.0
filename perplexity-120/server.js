import dotenv from "dotenv";
import { testAi } from "./src/services/ai.service.js";

testAi();
// Load env vars FIRST before anything else
dotenv.config({ path: "./.env" });

import connectDB from "./src/config/database.js";
import { app } from "./src/app.js";

const PORT = process.env.PORT || 3000;

// Connect to MongoDB, then start the Express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });