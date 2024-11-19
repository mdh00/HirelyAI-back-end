import express from "express";
import { createJobApplication, getAllJobApplications } from "../application/jobApplications.js";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import AuthorizationMiddleware from "./middleware/authorization-middleware.js";

const jobApplicationsRouter = express.Router();

jobApplicationsRouter
    .route("/")
    .post(ClerkExpressRequireAuth({}), createJobApplication)
    .get(ClerkExpressRequireAuth({}), AuthorizationMiddleware, getAllJobApplications);

export default jobApplicationsRouter;