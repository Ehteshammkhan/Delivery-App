import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

export default app;
