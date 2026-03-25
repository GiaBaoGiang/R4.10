import Like from "../models/Like.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

/**
 * @desc Obtenir les likes d'un film
 * @route GET /api/likes/movie/:movieId
 * @access Public
 */
export const getLikesByMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const likes = await Like.find({ movie: movieId })
      .populate({
        path: "user", 
        model: User
       });

    res.status(200).json({
      success: true,
      count: likes.length,
      data: likes.map((like) => ({
        id: like._id,
        user: like.user, 
      })),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "ID de film invalide" });
    }
    next(error);
  }
};

/**
 * @desc Obtenir les likes d'un utilisateur
 * @route GET /api/likes/my
 * @access Private
 */
export const getMyLikes = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const likes = await Like.find({ user: userId }).populate("movie", "title");

    res.status(200).json({ success: true, data: likes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

/**
 * @desc Créer un like pour un film
 * @route POST /api/likes
 * @access Private
 */
export const createLike = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Film non trouvé" });
    }

    const existingLike = await Like.findOne({ user: userId, movie: movieId });
    if (existingLike) {
      return res.status(400).json({ success: false, message: "Vous avez déjà aimé ce film" });
    }
    const like = await Like.create({ user: userId, movie: movieId });

    res.status(201).json({ success: true, data: like });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

/**
 * @desc Supprimer un like
 * @route DELETE /api/likes/:id
 * @access Private
 */
export const deleteLike = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const like = await Like.findOneAndDelete({ _id: id, user: userId });

    if (!like) {
      return res.status(404).json({ success: false, message: "Like non trouvé" });
    }

    res.status(200).json({ success: true, message: "Like supprimé" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
