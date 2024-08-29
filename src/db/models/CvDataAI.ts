import { getModelForClass, prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

export class CvDataAiClass {
  @prop({ index: true })
  jobId?: string;

  @prop({ type: Schema.Types.Mixed })
  data?: unknown;
}

export const CvDataAiModel = getModelForClass(CvDataAiClass, {
  schemaOptions: { timestamps: true },
});
