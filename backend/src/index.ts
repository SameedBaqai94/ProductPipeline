import express from 'express';
import userRoute from "./routes/UserRoute";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/api/users", userRoute);

app.listen(PORT, () => {
    console.log(`${PORT} is listening`);
})