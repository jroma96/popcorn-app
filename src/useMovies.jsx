import { useState, useEffect } from "react";

export default function useMovies(url, query) {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWY1NjU1NjNlM2ZjYmIyMWE3YThkMmU5NTM3NDRiOSIsIm5iZiI6MTc2OTcyMzYzNS4yNTIsInN1YiI6IjY5N2JkNmYzOWZiZWNmY2RmMzJhMzE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bvc1Q0wgmXZd0eeGRj2CsZ7JkUwJbsgAXG9x0SjFwjI";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        const urlReq =
          url +
          (query ? query : "interstellar") +
          "&include_adult=false&language=en-US&page=1";

        setIsLoading(true);
        const res = await fetch(urlReq, {
          ...options,
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Check your internet connection");
        setError("");
        const data = await res.json();
        const imgUrl = "https://image.tmdb.org/t/p/original";
        const movies = data.results.map((item) => ({
          id: item.id,
          name: item.original_title,
          img: imgUrl + item.poster_path,
          Year: item.release_date.split("-")[0],
          imdbRating: item.vote_average,
          userRating: item.popularity,
          plot: item.overview,
        }));
        setMovies(movies);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
    return () => controller.abort();
  }, [query, url]);

  return [movies, isLoading, error];
}
