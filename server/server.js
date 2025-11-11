
import express from "express";
import connectDB from "./config/db.js";
// import errorHandler from "./middlewares/errorhandler.js";
// import corsMiddleware from "./middlewares/cors.js";
import authrouter from "./route/User.js";
import router from "./route/Task.js";
import path from "path";
// require('dotenv').config(); // Load environment variables from .env file
import cors from "cors";

import 'dotenv/config';

const app = express();

app.use(cors({
  origin: "*",  // your React app URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if you're using cookies or authorization headers
}));


// Middleware
app.use(express.json());
// app.use(corsMiddleware);

// Routes
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authrouter);
app.use('/api', router)

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// Error Handling Middleware
// app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3001;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
     console.error("Failed to start server:", err);
  });