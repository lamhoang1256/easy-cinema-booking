import axios from "axios";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = process.env.REACT_APP_TMDB_KEY;
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) => `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieMeta: (movieId, type) => `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  getMovieDetail: (movieId) => {
    const path = `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`;
    return axios.get(path);
  },
  getUpcoming: () => `${tmdbEndpoint}/upcoming?api_key=${apiKey}`,
};
