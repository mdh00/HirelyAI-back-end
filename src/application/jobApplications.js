import JobApplication from "../persistance/Entities/jobApplications.js";
import { JobApplicationDTO } from "./dto/jobApplications.js";
import { clerkClient } from "@clerk/clerk-sdk-node";


export const getAllJobApplications = async (req, res, next) => {
  try {
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
    await JobApplication.create({ ...jobApplication.data, userId: userId });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};