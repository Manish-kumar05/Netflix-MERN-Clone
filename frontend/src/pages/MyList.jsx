import { useEffect, useState } from "react";
import axios from "axios";

function MyList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies(response.data);
    } catch (error) {
      console.log(error);
      alert("Please login first");
    }
  };
  const removeFromWatchlist = async (movieId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/watchlist/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMovies(movies.filter((movie) => movie.movieId !== movieId));
    alert("Removed from watchlist");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "red", marginBottom: "20px" }}>My List</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" }}>
        {movies.map((movie) => (
          <div key={movie._id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{movie.title}</h3>
            <button
  onClick={() => removeFromWatchlist(movie.movieId)}
  style={{
    marginTop: "10px",
    padding: "8px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: "100%",
  }}
>
  Remove
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyList;