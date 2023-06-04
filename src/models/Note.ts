import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notes", NoteSchema);
