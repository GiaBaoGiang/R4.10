import express from "express";
import { getAllGenres } from "../controllers/genre.controller.js";

const router = express.Router();

// Routes publiques
router.get("/", getAllGenres);

export default router;
