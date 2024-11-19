import express from "express";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import { getAllJobs, createJob, getJobById } from "../application/jobs.js";
import AuthorizationMiddleware from "./middleware/authorization-middleware.js";

const jobsRouter = express.Router();

jobsRouter
    .route("/").get(getAllJobs)
    .post(ClerkExpressRequireAuth({}), AuthorizationMiddleware, createJob);

jobsRouter.route("/:id").get(getJobById);

export default jobsRouter;