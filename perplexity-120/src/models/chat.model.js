import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Chat must belong to a user"],
      index: true, // faster lookups by user
    },
    title: {
      type: String,
      trim: true,
      default: "New Chat",
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
  }
);

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;
