import { z } from "zod";

export const GetCvDataSchema = z.object({
  jobId: z.string(),
});
