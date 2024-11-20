import Express from "express";
import jobsRouter from "./api/jobs.js";
import jobApplicationsRouter from "./api/jobApplications.js";
import "dotenv/config"; 
import { connectDB } from "./persistance/db.js";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";
import cors from "cors";

const app = Express();

app.use(Express.json());
app.use(cors({
    origin: ["https://hirelyai-frontend.netlify.app", "http://localhost:5173"]
  }));

connectDB()

app.use("/api/jobs", jobsRouter);
app.use("/api/jobapplications", jobApplicationsRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Webservice is listening on ${PORT}`);
})
