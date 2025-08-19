import express from 'express';
import userRoute from "./routes/UserRoute";
import itemRoute from "./routes/ItemRoute";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/items", itemRoute);

app.listen(PORT, () => {
    console.log(`${PORT} is listening`);
})