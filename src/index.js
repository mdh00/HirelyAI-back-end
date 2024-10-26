import Express from "express";
import jobsRouter from "./api/jobs.js";
import "dotenv/config"; 
import { connectDB } from "./persistance/db.js";

const app = Express();

app.use(Express.json());

connectDB()

app.use("/api/jobs", jobsRouter);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Webservice is listening on ${PORT}`);
})
