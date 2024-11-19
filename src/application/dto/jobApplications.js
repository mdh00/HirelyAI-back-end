import { z } from "zod";

export const JobApplicationDTO = z.object({
    fullName: z.string().min(1),
    answers: z.string().min(1).array().optional(),
    job: z.string().min(1),
    rating: z.string().min(1).optional(),
});