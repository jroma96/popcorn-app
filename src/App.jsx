import { useState, useEffect } from "react";
import StarRating from "./Stars";
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

/*const tempMovieData = [
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
];*/

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function WatchedMovieList({ movies, onRemoveMovie }) {
  return movies.length > 0 ? (
    movies.map((movie) => (
      <li key={movie.id}>
        <img src={movie.img} alt={`${movie.name} poster`} />
        <div
          style={{
            paddingTop: "2vh",
            display: "grid",
            gridTemplateRows: "3fr 1fr",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "space-around",
            gap: "0px",
          }}
        >
          <h3
            style={{
              alignContent: "center",
              textAlign: "center",
            }}
          >
            {movie.name}
          </h3>
          <button className="movieAdd" onClick={() => onRemoveMovie(movie.id)}>
            -
          </button>
        </div>
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
    ))
  ) : (
    <li>
      <h1>No Movies Yet</h1>
    </li>
  );
}

function MovieList({ movies, onAddMovie }) {
  return movies.length > 0 ? (
    movies.map((movie) => (
      <li key={movie.id}>
        <img src={movie.img} alt={`${movie.name} poster`} />
        <div
          style={{
            paddingTop: "2vh",
            display: "grid",
            gridTemplateRows: "3fr 1fr",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "space-around",
            gap: "0px",
          }}
        >
          <h3 style={{ alignContent: "center", textAlign: "center" }}>
            {movie.name}
          </h3>
          <button
            style={{ alignContent: "center", textAlign: "center" }}
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
    ))
  ) : (
    <li>
      <h3>Search for Movies</h3>
    </li>
  );
}

function Summary({ avgImdbRating, avgUserRating, results }) {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{results} movies</span>
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
  );
}

function MoviesBox({ element, children }) {
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {children}
      {isOpen2 && (
        <>
          <ul className="list">{element}</ul>
        </>
      )}
    </div>
  );
}

function NavBar({ query, onSearch, results }) {
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
      <p className="num-results">Found {results} movies</p>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const results = watched.length;
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating),
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating),
  ).toFixed(2);
  function handleAddMovie(movie) {
    setWatched((arr) => [...arr, movie]);
  }

  function handleRemoveMovie(id) {
    setWatched((arr) => arr.filter((item) => item.id != id));
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
      <NavBar onSearch={setQuery} query={query} results={movies.length} />
      <Main>
        <MoviesBox
          element={<MovieList movies={movies} onAddMovie={handleAddMovie} />}
        />
        <MoviesBox
          element={
            <WatchedMovieList
              movies={watched}
              onModifyList={handleRemoveMovie}
            />
          }
        >
          <Summary
            results={results}
            avgImdbRating={avgImdbRating}
            avgUserRating={avgUserRating}
          />
        </MoviesBox>
      </Main>
    </div>
  );
}

export default App;
