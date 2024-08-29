import multer from "multer";
import { Router } from "express";
import { parseOfficeAsync } from "officeparser";

import { processResume } from "../utils";

export const uploadRouter = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

uploadRouter.post("/resume", upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;
    if (
      file != null &&
      (file.mimetype.includes("pdf") || file.mimetype.includes("doc"))
    ) {
      const text = await parseOfficeAsync(file.buffer);
      const data = await processResume(text);
      res.status(200).send(data);
      // test comment
    } else
      res.status(400).send({
        status: false,
        message: "File is required or must be pdf or doc type",
      });
  } catch (error) {
    next(error);
  }
});

// uploadRouter.get("/data", async (req, res, next) => {
//   try {
//     const { jobId } = await GetCvDataSchema.parseAsync(req.query);
//     try {
//       const profile = await CvDataAiModel.findOne({
//         jobId,
//       });
//       if (profile) {
//         res.status(200).send({
//           state: true,
//           data: profile.data,
//         });
//       } else
//         res.status(404).send({
//           status: false,
//           message: "Profile data not found",
//         });
//     } catch (error) {
//       next(error);
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
