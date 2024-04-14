import mongoose from "mongoose";
const { Schema, models } = mongoose;

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is empty"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Prompt = models.Prompt || mongoose.model("Prompt", promptSchema);
export default Prompt;
