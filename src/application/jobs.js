import Job from "../persistance/Entities/jobs.js";
import {z} from 'zod';
import { JobDTO } from "./dto/jobs.js";
import ValidationError from "../domain/errors/validation-error.js";
import NotfoundError from "../domain/errors/not-found-error.js";

const jobs = [
  {
    _id: "xyz",
    title: "Intern - Software Engineer",
    description: "lorem23",
    type: "Full-time",
    location: "Remote",
    questions: [
      "Share your academic background and highlight key programming concepts you've mastered. How has your education shaped your current tech skill set ?",
      "Describe your professional development, emphasizing any certifications obtained. How have these certifications enriched your technical abilities, and can you provide an example of their practical application ?",
      "Discuss notable projects in your programming experience. What challenges did you face, and how did you apply your skills to overcome them? Highlight the technologies used and the impact of these projects on your overall growth as a prefessional ?",
    ],
  },
  {
    _id: "abc",
    title: "Software Engineer",
    type: "Full-time",
    location: "Colombo, Sri Lanka",
    questions: [
      "Share your academic background and highlight key programming concepts you've mastered. How has your education shaped your current tech skill set ?",
      "Describe your professional development, emphasizing any certifications obtained. How have these certifications enriched your technical abilities, and can you provide an example of their practical application ?",
      "Discuss notable projects in your programming experience. What challenges did you face, and how did you apply your skills to overcome them? Highlight the technologies used and the impact of these projects on your overall growth as a prefessional ?",
    ],
  },
  {
    _id: "123",
    title: "Software Architect",
    type: "Hybrid",
    location: "Rajagiriya, Sri Lanka",
    questions: [
      "Share your academic background and highlight key programming concepts you've mastered. How has your education shaped your current tech skill set ?",
      "Describe your professional development, emphasizing any certifications obtained. How have these certifications enriched your technical abilities, and can you provide an example of their practical application ?",
      "Discuss notable projects in your programming experience. What challenges did you face, and how did you apply your skills to overcome them? Highlight the technologies used and the impact of these projects on your overall growth as a prefessional ?",
    ],
  },
];

export const getAllJobs = async (req, res, next) => {
  try {
    const alljobs = await Job.find()
    return res.status(200).json(alljobs);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const job = JobDTO.safeParse(req.body);
    if(!job.success){
      throw new ValidationError(job.error);
    }
    await Job.create(job.data);
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (job === null) {
      throw new NotfoundError("Job not found");
    }
    return res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};