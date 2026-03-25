// Composant générique pour afficher un avis, adaptable pour les films ou les utilisateurs
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Avatar from "../common/Avatar";
import StarRating from "../common/StarRating";
import Editable from "../common/Editable";

//Contextes
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

//Services API
import { reviewsAPI } from "../../services/api";

// Composant pour afficher un avis, avec possibilité d'édition si l'utilisateur est le propriétaire de l'avis
const MovieReviewItem = ({ review, type }) => {
  // État local
  const [isEditing, setIsEditing] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { error, success } = useNotification();
  const isEditable = isAuthenticated() && review.user._id === user._id;
  const [updatedReview, setUpdatedReview] = useState(review);
  const navigate = useNavigate();

  //On met à jour la note dans la review
  const handleRate = (rating) => {
    setUpdatedReview((prev) => ({ ...prev, rating }));
  };

  //On met à jour le commentaire dans la review
  const handleCommentChange = (e) => {
    setUpdatedReview((prev) => ({ ...prev, comment: e.target.value }));
  };

  //Switch entre mode édition et affichage
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  //Valide les modifications et envoie la requête de mise à jour
  const validateEdit = async () => {
    try {
      const response =
        updatedReview._id === "new"
          ? await reviewsAPI.create(updatedReview)
          : await reviewsAPI.update(updatedReview._id, updatedReview);

      if (!response.success)
        throw new Error(response.message || "Failed to update review");

      success("Avis mis à jour avec succès !");
    } catch (err) {
      setUpdatedReview(review); // Revert to original review on error
      error("Echec de la mise à jour de l'avis : " + err.message);
    } finally {
      setIsEditing(false);
    }
  };

  //
  useEffect(() => {
    setUpdatedReview(review);
    review._id === "new" && setIsEditing(true); // Si c'est un nouvel avis, on passe directement en mode édition
  }, [review]);

  return (
    <div
      className={`review-card ${type == "movie" ? "grid" : "list"} shadow-md `}
    >
      <div className="review-image">
        {/* Affichage conditionnel de l'image (Movie) ou Avatar (User) */}
        {type === "movie" ? (
          <img
            src={review.movie.poster}
            onClick={() => navigate(`/movie/${review.movie._id}`)}
            className="cursor-pointer"
          />
        ) : (
          <Avatar src={review.user.avatar} />
        )}
      </div>

      <div className="p-4 group review-content relative">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-slate-100">
            {type === "movie"
              ? updatedReview.movie.title
              : updatedReview.user.name}
          </h4>
          <span className="text-xs text-slate-500">
            {new Date(
              updatedReview.updatedAt || updatedReview.createdAt,
            ).toLocaleDateString()}
          </span>
        </div>

        <StarRating
          key={`star_$ {updatedReview._id}`}
          rating={updatedReview.rating}
          editable={isEditing}
          onRate={handleRate}
        />
        {isEditing ? (
          <textarea
            value={updatedReview.comment}
            onChange={handleCommentChange}
            className="w-full p-2 bg-slate-700 text-slate-100 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-primary"
            rows={5}
          />
        ) : (
          <p className="text-gray-400 italic">"{updatedReview.comment}"</p>
        )}
        {isEditable && (
          <Editable
            key={`editable_${review._id}`}
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            validateEdit={validateEdit}
          />
        )}
      </div>
    </div>
  );
};
export default MovieReviewItem;
