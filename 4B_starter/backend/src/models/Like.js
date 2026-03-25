import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// INDEX composé pour éviter les doublons et optimiser les requêtes
likeSchema.index({ user: 1, movie: 1 });

const Like = mongoose.model("4B_like", likeSchema);

export default Like;
