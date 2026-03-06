import { useState, useEffect, useRef } from "react";
import StarRating from "./Stars";
import useMovies from "./useMovies";
import "./App.css";
import useStorage from "./useStorage";
import useKey from "./useKey";

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

function MovieList({ movies, onAddMovie, onSelectMovie }) {
  return movies.length > 0 ? (
    movies.map((movie) => (
      <li key={movie.id} onClick={() => onSelectMovie(movie.id)}>
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
            onClick={(e) => onAddMovie(e, movie)}
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
  const el = useRef(null);

  function callback(e) {
    if (document.activeElement === el.current) return;
    if (e.code === "Enter") {
      el.current.focus();
      onSearch("");
    }
  }

  useKey("Enter", callback);
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
        ref={el}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      <p className="num-results">Found {results} movies</p>
    </div>
  );
}

function Loader() {
  return <p className="Loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🔥</span>
      {message}
    </p>
  );
}

function SelectedMovie({ current, onHide }) {
  function callBack(e, key) {
    if (e.code.toLowerCase() === key.toLowerCase()) {
      onHide("");
    }
  }

  useEffect(() => {
    if (current.name !== undefined) document.title = "Movie | " + current.name;

    return () => {
      document.title = "popcornApp";
    };
  }, [current]);
  useKey("Escape", callBack);
  return (
    <div className="movie-display">
      <div style={{ alignContent: "center" }}>
        <img src={current.img} />

        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5px",
            fontSize: "25px",
            height: "15%",
          }}
        >
          {current.name}
        </h3>
        <div className="rating">
          <StarRating
            maxRating={10}
            size={24}
            defaultRating={current.imdbRating}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <p
          style={{
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingTop: "10px",
            fontSize: "15px",
            height: "40%",
            maxHeight: "60%",
          }}
        >
          {current.plot}
        </p>
        <button
          style={{
            height: "27px",
            width: "30px",
            alignSelf: "center",
            justifySelf: "center",
          }}
          onClick={() => onHide("")}
        >
          X
        </button>
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [movies, isLoading, error] = useMovies(
    "https://api.themoviedb.org/3/search/movie?query=",
    query,
  );
  const [watched, setWatched] = useStorage("watched");
  const [selectedMovie, setSelectedMovie] = useState("");
  const results = watched.length;
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating),
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating),
  ).toFixed(2);

  function handleSelectMovie(id) {
    if (movies.find((movie) => movie.id === id) !== null) {
      setSelectedMovie((s) =>
        s.id === id ? "" : movies.find((movie) => movie.id === id),
      );
    }
  }

  function handleSetQuery(value) {
    setQuery(value);
  }

  function handleAddMovie(e, movie) {
    e.stopPropagation();
    if (watched.findIndex((item) => item.id === movie.id) === -1) {
      setWatched((arr) => [...arr, movie]);
    }
  }

  function handleRemoveMovie(id) {
    setWatched((arr) => arr.filter((item) => item.id !== id));
  }

  return (
    <div>
      <NavBar onSearch={handleSetQuery} query={query} results={movies.length} />
      <Main>
        {isLoading && <MoviesBox element={<Loader />} />}
        {!isLoading && error === "" && (
          <MoviesBox
            element={
              <MovieList
                movies={movies}
                onAddMovie={handleAddMovie}
                onSelectMovie={handleSelectMovie}
              />
            }
          />
        )}
        {error !== "" && <ErrorMessage message={error} />}
        {selectedMovie ? (
          <MoviesBox>
            <SelectedMovie current={selectedMovie} onHide={setSelectedMovie} />
          </MoviesBox>
        ) : (
          <MoviesBox
            element={
              <WatchedMovieList
                movies={watched}
                onRemoveMovie={handleRemoveMovie}
              />
            }
          >
            <Summary
              results={results}
              avgImdbRating={avgImdbRating}
              avgUserRating={avgUserRating}
            />
          </MoviesBox>
        )}
      </Main>
    </div>
  );
}

export default App;
