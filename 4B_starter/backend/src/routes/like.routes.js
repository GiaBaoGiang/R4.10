import express from "express";
import {
  createLike,
  getMyLikes,
  getLikesByMovie,
  deleteLike,
} from "../controllers/like.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Routes protégées utilisateur
router.get("/my-likes", protect, getMyLikes);
router.get("/movie/:movieId", protect, getLikesByMovie);
router.post("/", protect, createLike);
router.delete("/:id", protect, deleteLike);

export default router;
