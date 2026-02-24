const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },

    imgUrl: {
      type: String,
      required: [true, "imgUrl is required for creating a post"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // model name EXACT match hona chahiye user.model.js se
      required: [true, "user id is required for creating a post"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;