import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import MovieCard from "../components/movies/MovieCard";
import Loading from "../components/common/Loading";
import Button from "../components/common/Button";

import { useAuth } from "../context/AuthContext";

import { moviesAPI } from "../services/api";

function MyLikes() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadLikedMovies = async () => {
      try {
        setLoading(true);
        const data = await moviesAPI.getLikedByUser();
        setLikedMovies(data.data || data);
      } catch (err) {
        console.error("Erreur chargement likes:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      loadLikedMovies();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Loading message="Chargement de vos favoris..." />;
  }

  if (likedMovies.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Mes likes</h2>
            <p className="text-gray-400 text-lg mb-8">
              Vous n'avez pas encore liké de films.
            </p>
            <Button onClick={() => navigate("/")} size="lg">
              Découvrir des films
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Mes likes</h1>
        <p className="text-gray-400 mb-8">
          {likedMovies.length} film{likedMovies.length > 1 ? "s" : ""} lik{likedMovies.length > 1 ? "és" : "é"}
        </p>

        {/* Grille de films */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {likedMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyLikes;
