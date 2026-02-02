import { useState, useEffect } from "react";
import "./App.css";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWY1NjU1NjNlM2ZjYmIyMWE3YThkMmU5NTM3NDRiOSIsIm5iZiI6MTc2OTcyMzYzNS4yNTIsInN1YiI6IjY5N2JkNmYzOWZiZWNmY2RmMzJhMzE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bvc1Q0wgmXZd0eeGRj2CsZ7JkUwJbsgAXG9x0SjFwjI";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + token,
  },
};

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Main({ movies, watchedMovies, onAddMovie }) {
  return (
    <main className="main">
      <Movies movies={movies} onAddMovie={onAddMovie} />
      <WatchedMovies watchedMovies={watchedMovies} />
    </main>
  );
}

function WatchedMovies({ watchedMovies }) {
  const [isOpen2, setIsOpen2] = useState(true);
  console.log(watchedMovies);
  const avgImdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedMovies.map((movie) => movie.userRating));
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watchedMovies.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
              </p>
            </div>
          </div>

          <ul className="list">
            {watchedMovies.map((movie) => (
              <li key={movie.id}>
                <img src={movie.img} alt={`${movie.name} poster`} />
                <h3>{movie.name}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Movies({ movies, onAddMovie }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <ul className="list">
          {movies?.map((movie) => (
            <li key={movie.id}>
              <img src={movie.img} alt={`${movie.name} poster`} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <h3 style={{ alignContent: "center", textAlign: "center" }}>
                  {movie.name}
                </h3>
                <button
                  className="movieAdd"
                  title="Add movie"
                  onClick={() => onAddMovie(movie)}
                >
                  +
                </button>
              </div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NavBar({ query, onSearch }) {
  return (
    <div className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>UsePopcorn</h1>
      </div>
      <input
        name="movieSearch"
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      <p className="num-results">Found X movies</p>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  function handleAddMovie(movie) {
    setWatched((arr) => [...arr, movie]);
  }
  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/search/movie?query=" +
      query +
      "&include_adult=false&language=en-US&page=1";
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.results);
        const imgUrl = "https://image.tmdb.org/t/p/original";
        const movies = json.results.map((item) => ({
          id: item.id,
          name: item.original_title,
          img: imgUrl + item.poster_path,
          Year: item.release_date.split("-")[0],
          imdbRating: item.vote_average,
          userRating: item.popularity,
        }));
        setMovies(movies);
      })
      .catch((err) => console.error(err));
  }, [query]);
  return (
    <div>
      <NavBar onSearch={setQuery} query={query} />
      <Main
        movies={movies}
        watchedMovies={watched}
        onAddMovie={handleAddMovie}
      />
    </div>
  );
}

export default App;
