import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/movies/trending"
      );

      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/search?query=${search}`
      );

      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToWatchlist = async (movie) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/watchlist",
        {
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          overview: movie.overview,
          releaseDate: movie.release_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to watchlist");
    } catch (error) {
      console.log(error);
      alert("Login first");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="title">Trending Movies</h1>

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="search-button" onClick={searchMovies}>
          Search
        </button>
      </div>

      {movies.length > 0 && (
        <div
          className="hero-banner"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`,
          }}
        >
          <div className="hero-content">
            <h1>{movies[0].title}</h1>
            <p>{movies[0].overview}</p>
            <button onClick={() => addToWatchlist(movies[0])}>
              Add to My List
            </button>
          </div>
        </div>
      )}

      {loading && <h2 className="text-white text-xl">Loading movies...</h2>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            className="movie-card cursor-pointer"
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
          >
            <img
              className="movie-image"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>

              <button
                className="watchlist-button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToWatchlist(movie);
                }}
              >
                Add to My List
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded"
            >
              X
            </button>

            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="w-full max-h-96 object-cover rounded-lg mb-4"
            />

            <h1 className="text-3xl font-bold mb-3">
              {selectedMovie.title}
            </h1>

            <p className="mb-3">{selectedMovie.overview}</p>

            <p className="mb-3">
              Release Date: {selectedMovie.release_date}
            </p>

            <p className="mb-4">
              Rating: {selectedMovie.vote_average}
            </p>

            <button
              onClick={() => addToWatchlist(selectedMovie)}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Add to My List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;