import express from "express";
import dotenv from 'dotenv';
import userRouter from "./routes/UserRoutes.js";

dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log(`${PORT} is listening`);
})