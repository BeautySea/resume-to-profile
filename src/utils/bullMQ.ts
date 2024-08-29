// import { Queue, Worker } from "bullmq";

// import { processResume } from "./openai";
// import { CvDataAiModel } from "../db";

// export const resumeQueue = new Queue("process-resume", {
//   connection: {
//     host: process.env.REDIS_URL,
//     password: process.env.REDIS_PASSWORD,
//     username: process.env.REDIS_USERNAME,
//     port: 18968,
//   },
// });

// export const resumeWorker = new Worker(
//   "process-resume",
//   async (job) => {
//     const data = await processResume(job.data.text);
//     await CvDataAiModel.create({
//       jobId: job.data.jobId,
//       data: JSON.parse(data),
//     });
//   },
//   {
//     connection: {
//       host: process.env.REDIS_URL,
//       password: process.env.REDIS_PASSWORD,
//       username: process.env.REDIS_USERNAME,
//       port: 18968,
//     },
//     autorun: false,
//   },
// );

// resumeWorker.on("progress", (job) => {
//   console.log(`Job ${job.id} in progress`);
// });

// resumeWorker.on("completed", (job) => {
//   console.log(`Job ${job.id} completed`);
// });

// resumeWorker.on("failed", async (job) => {
//   await CvDataAiModel.deleteMany({
//     jobId: job?.data.jobId,
//   });
//   console.error("Resume processing failed");
// });
