import express from 'express';
import userRoute from "./routes/UserRoute";
import itemRoute from "./routes/ItemRoute";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoute);
app.use("/api/items", itemRoute);

app.listen(PORT, () => {
    console.log(`${PORT} is listening`);
})