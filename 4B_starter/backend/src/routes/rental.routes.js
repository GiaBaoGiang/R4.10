import express from "express";
import {
  createRental,
  getMyRentals,
  cancelRental,
} from "../controllers/rental.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Routes protégées utilisateur
router.post("/", protect, createRental);
router.get("/my-rentals", protect, getMyRentals);
router.delete("/:id", protect, cancelRental);

// Routes temporaires (simulation userId)
router.post(
  "/",
  (req, res, next) => {
    req.user = { _id: "507f1f77bcf86cd799439011" }; // User ID de test
    next();
  },
  createRental,
);

router.get(
  "/my-rentals",
  (req, res, next) => {
    req.user = { _id: "507f1f77bcf86cd799439011" };
    next();
  },
  getMyRentals,
);

router.delete(
  "/:id",
  (req, res, next) => {
    req.user = { _id: "507f1f77bcf86cd799439011" };
    next();
  },
  cancelRental,
);


export default router;
