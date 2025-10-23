import express from "express";
import userRoute from "./routes/UsersRoute.js";
import itemsRoute from "./routes/ItemsRoute.js";
import dotenv from 'dotenv';

const app = express();
const PORT = 8080;
dotenv.config();

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/items", itemsRoute);

app.listen(PORT, () => {
    console.log(`${PORT} is running`);
});