import Like from "../models/Like.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

/**
 * @desc Obtenir les likes d'un film
 * @route GET /api/likes/movie/:movieId
 * @access Public
 */
export const getLikesByMovie = async (req, res, next) => {
  //TODO
};

/**
 * @desc Obtenir les likes d'un utilisateur
 * @route GET /api/likes/my
 * @access Private
 */
export const getMyLikes = async (req, res, next) => {
 //TODO
};

/**
 * @desc Créer un like pour un film
 * @route POST /api/likes
 * @access Private
 */
export const createLike = async (req, res, next) => {
  //TODO
};

/**
 * @desc Supprimer un like
 * @route DELETE /api/likes/:id
 * @access Private
 */
export const deleteLike = async (req, res, next) => {
  //TODO
};
