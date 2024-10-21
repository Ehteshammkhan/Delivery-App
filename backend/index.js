import dotenv from "dotenv";
import connectDB from "./src/DB/connection.js";
import app from "./app.js";
import foodRouter from "./src/routes/food.route.js";
import express from "express";
import userRouter from "./src/routes/user.route.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running at: ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection faild!!", err);
  });

app.use(express.json());

// API END POINT

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
