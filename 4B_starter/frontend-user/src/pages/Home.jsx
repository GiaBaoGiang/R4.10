// Home.jsx
import { useState, useEffect } from "react";

// Components
import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import MovieCarousel from "../components/movies/MovieCarousel";
import MovieHeroCarousel from "../components/movies/MovieHeroCarousel";
import Loading from "../components/common/Loading";

// Context
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

// Services
import { moviesAPI } from "../services/api";

// Page d'accueil
function Home() {
  // États locaux
  const [popularMovies, setPopularMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, user } = useAuth();
  const { error } = useNotification();

  // Charger les films populaires
  const loadPopularMovies = async () => {
    try {
      const popular = await moviesAPI.getPopular();
      setPopularMovies(popular.data || popular);
    } catch (err) {
      console.error("Erreur chargement films populaires:", err);
    }
  };

  // Charger les films récents
  const loadRecentMovies = async () => {
    try {
      const recents = await moviesAPI.getRecent();
      setRecentMovies(recents.data || recents);
    } catch (err) {
      console.error("Erreur chargement films recents", err);
    }
  };

  // Charger les films au montage du composant
  useEffect(() => {
    const loadAllMovies = async () => {
      setLoading(true);
      await loadPopularMovies();
      await loadRecentMovies();
      setLoading(false);
    };
    loadAllMovies();
  }, []);

  // État de chargement
  if (loading) {
    return <Loading message="Chargement des films..." />;
  }

  // Pas de films
  if (popularMovies.length === 0 && recentMovies.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Aucun film disponible</h2>
          <p className="text-gray-400">
            Revenez plus tard pour découvrir nos films.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar movies={popularMovies} onSearch={""} />

      {/* Hero Section */}
      <MovieHeroCarousel />
      {/* Movies Lists */}
      <div className="container mx-auto">
        <MovieCarousel id="popular" title="Films populaires" movies={popularMovies} />
        <MovieCarousel id="recent" title="Films récents" movies={recentMovies} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
