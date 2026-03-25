import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import MovieReviewItem from "./MovieReviewItem";
import Loading from "../common/Loading";
import LoadingError from "../common/LoadingError";
import Button from "../common/Button";

// Contexts
import { useAuth } from "../../context/AuthContext";

// Services API
import { reviewsAPI } from "../../services/api";

const MovieReviews = ({ movieId }) => {
  // États locaux
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAuthenticated } = useAuth();

  // Vérifier si l'utilisateur a déjà laissé un avis pour ce film
  const hasReviewed = reviews.some((review) => review.user._id === user?._id);

  // Charger les avis du film
  const fetchReviews = async () => {
    try {
      const response = await reviewsAPI.getByMovieId(movieId);
      if (!response.success)
        throw new Error(response.message || "Failed to fetch reviews");
      setReviews(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Gérer l'ajout d'un nouvel avis
  const handleAddReview = () => {
    //on crée un avis vide pour que l'utilisateur puisse le remplir ensuite
    const newReview = {
      movie: movieId,
      user: user,
      rating: 0, // Note par défaut, l'utilisateur pourra la modifier
      createdAt: new Date().toISOString(),
      comment: "",
      _id: "new", // ID temporaire pour différencier les nouveaux avis non encore enregistrés
    };

    //On l'ajoute à la liste des avis pour que l'utilisateur puisse le voir immédiatement
    setReviews((prev) => [newReview, ...prev]);
  };

  useEffect(() => {
    fetchReviews();
  }, [user, isAuthenticated(), movieId]);

  if (loading) return <Loading />;
  if (error) return <LoadingError fetchData={fetchReviews} error={error} />;
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Avis utilisateurs</h2>
      {reviews.length === 0 && (
        <div>
          <p>Aucun avis pour ce film. Soyez le premier à commenter !</p>
        </div>
      )}
      {!isAuthenticated() && (
        <p>
          <Link to="/login" className="text-primary hover:underline">
            Connectez-vous
          </Link>{" "}
          pour ajouter un avis.{" "}
        </p>
      )}
      {isAuthenticated() && !hasReviewed && (
        <div className="mb-6 justify-end flex">
          <Button variant="primary" size="md" onClick={handleAddReview}>
            Ajouter un avis
          </Button>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="movie-reviews  bg-gray-900 rounded-lg p-6 border border-gray-800">
          {reviews.map((review) => (
            <MovieReviewItem key={review._id} review={review} type="user" />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieReviews;
