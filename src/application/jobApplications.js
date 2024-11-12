import JobApplication from "../persistance/Entities/jobApplications.js";

export const getAllJobApplications = async (req, res) => {
    try {
        const jobApplications = await JobApplication.find()
          .populate("job", ["title", "description"])
          .exec();
        return res.status(200).json(jobApplications);
      } catch (error) {
      }

};

export const createJobApplication = async (req, res) => {
    try {
      const jobApplication = req.body;
      await JobApplication.create(jobApplication);
      return res.status(201).send();
    } catch (error) {
  
    }
  };