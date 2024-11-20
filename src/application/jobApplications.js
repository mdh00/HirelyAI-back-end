import JobApplication from "../persistance/Entities/jobApplications.js";
import { JobApplicationDTO } from "./dto/jobApplications.js";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { generateRating } from "./rating.js";
import ValidationError from "../domain/errors/validation-error.js";
import NotFoundError from "../domain/errors/not-found-error.js";


export const getAllJobApplications = async (req, res, next) => {
  try { 
    const { jobId } = req.query;
    if (jobId) {
      const jobApplications = await JobApplication.find({ job: jobId })
        .populate("job", ["title", "description"])
        .exec();
        console.log("Job Applications:", jobApplications);
      return res.status(200).json(jobApplications);
    }

    const jobApplications = await JobApplication.find()
      .populate("job", ["title", "description"])
      .exec();
    return res.status(200).json(jobApplications);
  } catch (error) {
    console.log(error);
    next(error);
  }

};

export const createJobApplication = async (req, res, next) => {
  try {
    console.log(req.auth);
    const { userId } = req.auth;

    //We can get more info about the user with this method
    const user = await clerkClient.users.getUser(userId);
    console.log(user);

    const jobApplication = JobApplicationDTO.safeParse(req.body);
    if (!jobApplication.success) {
      throw new ValidationError(jobApplication.error);
    }
    const createdJobAplication = await JobApplication.create({ ...jobApplication.data, userId: userId });
    //generate rating
    const rating = await generateRating(createdJobAplication._id);
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getJobApplicationById = async (req, res, next) => {
  try {
    const jobApplicationId = req.params.id;
    console.log("Fetching Job Application ID:", jobApplicationId);

    const jobApplication = await JobApplication.findById(jobApplicationId)

    if (jobApplication === null) {
      throw new NotFoundError("Job Application not found");
    }
    console.log("Job Application:", jobApplication);
    return res.status(200).json(jobApplication);
  } catch (error) {
    next(error);
  }
};