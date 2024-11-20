import OpenAI from "openai";
import JobApplication from "../persistance/Entities/jobApplications.js";

const client = new OpenAI({ apiKey: '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' });

export async function generateRating(jobApplicationId) {
    try {
        const jobApplication = await JobApplication.findById(jobApplicationId).populate("job");
        // Role: Software Architect, Description: "fsjafksdjfklsja"
        const content = `Role:${jobApplication?.job.title}, User Description : ${jobApplication?.answers.join(". ")}`

        const completion = await client.chat.completions.create(
            {
                messages: [{ role: "user", content }],
                model: "ft:gpt-3.5-turbo-0125:stemlink:fullstacktutorial:AVaxCZWs"
            }
        );
        console.log("OpenAI Completion Response:", completion);

        const response = JSON.parse(completion.choices[0].message.content);

        // Log the parsed response to inspect its structure
        console.log("Parsed Response:", response);

        // Check if the 'rate' field exists in the response and handle it
        if (!response || !response.rate) {
            console.log("Rating is missing or undefined");
            return;
        }


        await JobApplication.findOneAndUpdate({ _id: jobApplicationId }, { rating: response.rate })
        
    }
    catch (err) {
        console.log(err);
    }
}