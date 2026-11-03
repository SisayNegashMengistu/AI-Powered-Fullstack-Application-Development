// The key is read from .env (VITE_TMDB_API_KEY) so it never lands in git.
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// true when a real key has been provided; otherwise the app uses local demo data
export const hasApiKey = Boolean(API_KEY) && API_KEY !== "your_api_key_here";

const today = new Date().toISOString().slice(0, 10);

const requests = {
  // --- from the video ---
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

  // --- recently added on Netflix ---
  // TMDB has no official "new on Netflix" feed, so we use:
  //  series made for the Netflix network (id 213), newest first
  fetchNewNetflixSeries:
    `/discover/tv?api_key=${API_KEY}&with_networks=213&sort_by=first_air_date.desc` +
    `&first_air_date.lte=${today}&include_null_first_air_dates=false`,
  //  movies streaming on Netflix (watch provider id 8), newest release first
  fetchNewNetflixMovies:
    `/discover/movie?api_key=${API_KEY}&with_watch_providers=8&watch_region=US` +
    `&with_watch_monetization_types=flatrate&sort_by=primary_release_date.desc` +
    `&primary_release_date.lte=${today}`,

  // --- more rows for the TV Shows / Movies pages ---
  fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchPopularTv: `/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedTv: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchDramaTv: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
  fetchSciFiTv: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
};

// --- URL builders for things that need an id or a search word ---
// one call returns the details + trailers + cast + similar titles
export const detailsUrl = (type, id) =>
  `/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,recommendations`;

export const recommendationsUrl = (type, id) =>
  `/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US`;

// Categories page: one genre of movies or TV, sorted server-side, page by page.
// "Top rated" needs a minimum vote count, otherwise one-vote obscure titles float to the top.
export function discoverUrl({ type, genre, sort, page = 1 }) {
  const dateField = type === "tv" ? "first_air_date" : "primary_release_date";
  const sortBy = {
    popular: "popularity.desc",
    rating: "vote_average.desc",
    newest: `${dateField}.desc`,
  }[sort];
  let url = `/discover/${type}?api_key=${API_KEY}&language=en-US&with_genres=${genre}&sort_by=${sortBy}&page=${page}`;
  if (sort === "rating") url += "&vote_count.gte=300";
  if (sort === "newest") url += `&${dateField}.lte=${today}&vote_count.gte=5`;
  return url;
}

export const searchUrl = (query) =>
  `/search/multi?api_key=${API_KEY}&language=en-US&include_adult=false&query=${encodeURIComponent(query)}`;

export default requests;
