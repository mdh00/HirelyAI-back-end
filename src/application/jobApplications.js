import JobApplication from "../persistance/Entities/jobApplications.js";
import { JobApplicationDTO } from "./dto/jobApplications.js";


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
      const jobApplication = JobApplicationDTO.safeParse(req.body);
      if(!jobApplication.success){
        throw new ValidationError(jobApplication.error);
      }
      await JobApplication.create(jobApplication);
      return res.status(201).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };