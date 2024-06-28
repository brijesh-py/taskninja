import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter, todoRouter } from "./routes/index.js";

// Initialize app
export const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", todoRouter);
