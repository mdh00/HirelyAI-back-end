//dto - data transfer object

import {z} from 'zod';

export const JobDTO = z.object({
    title: z.string().min(1),
    description: z.string(),
    type: z.string().min(1),
    location: z.string().min(1),
    questions: z.string().array().optional(),
  }); 
