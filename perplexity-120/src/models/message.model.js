import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: [true, "Message must belong to a chat"],
      index: true, // faster lookups by chat
    },
    content: {
      type: String,
      required: [true, "Message content cannot be empty"],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "ai"],
        message: "Role must be either 'user' or 'ai'",
      },
      required: [true, "Message role is required"],
    },
  },
  {
    timestamps: true, // auto adds createdAt (message order reference)
  }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
