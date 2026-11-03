export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const BANNER_BASE = "https://image.tmdb.org/t/p/original/";
export const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";
export const PROFILE_BASE = "https://image.tmdb.org/t/p/w185";

// TMDB returns genre ids; the card hover panel shows names.
export const GENRES = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  53: "Thriller", 10752: "War", 37: "Western", 10759: "Action & Adventure",
  10765: "Sci-Fi & Fantasy", 10768: "War & Politics",
};

// [TMDB genre id, name] lists for the Categories page (movies and TV use different sets)
export const MOVIE_GENRES = [
  [28, "Action"], [12, "Adventure"], [16, "Animation"], [35, "Comedy"], [80, "Crime"],
  [99, "Documentary"], [18, "Drama"], [10751, "Family"], [14, "Fantasy"], [36, "History"],
  [27, "Horror"], [10402, "Music"], [9648, "Mystery"], [10749, "Romance"], [878, "Sci-Fi"],
  [53, "Thriller"], [10752, "War"], [37, "Western"],
];
export const TV_GENRES = [
  [10759, "Action & Adventure"], [16, "Animation"], [35, "Comedy"], [80, "Crime"],
  [99, "Documentary"], [18, "Drama"], [10751, "Family"], [10762, "Kids"], [9648, "Mystery"],
  [10764, "Reality"], [10765, "Sci-Fi & Fantasy"], [10768, "War & Politics"], [37, "Western"],
];

const DAY = 24 * 60 * 60 * 1000;

// Turn a raw TMDB result into one shape that every component understands.
// `key` is unique across movies AND tv shows (TMDB ids can repeat between the two).
export function normalizeMovie(m, defaultType) {
  const type =
    m.media_type === "tv" || m.media_type === "movie"
      ? m.media_type
      : defaultType || (m.first_air_date !== undefined || m.name ? "tv" : "movie");

  const image = m.backdrop_path || m.poster_path;
  const date = m.release_date || m.first_air_date || "";
  const isRecent = date && Date.now() - new Date(date).getTime() < 120 * DAY;

  return {
    key: `${type}-${m.id}`,
    id: m.id,
    media_type: type,
    title: m.title || m.name || m.original_name || "Untitled",
    overview: m.overview || "",
    poster_path: image ? IMAGE_BASE + image : null,
    backdrop: m.backdrop_path ? BACKDROP_BASE + m.backdrop_path : image ? IMAGE_BASE + image : null,
    rating: m.vote_average || 0,
    date,
    matureRating: m.adult ? "A 18+" : "U/A 13+",
    category: type === "tv" ? "TV" : "Movie",
    quality: "HD",
    genres: (m.genres
      ? m.genres.map((g) => g.name)
      : (m.genre_ids || []).map((id) => GENRES[id])
    ).filter(Boolean).slice(0, 3),
    badge: isRecent ? "Recently added" : m.vote_average >= 7.5 ? "Top rated" : "",
  };
}

// Same idea for the offline demo entries from Data.js
export function normalizeLocal(m) {
  return {
    ...m,
    key: `movie-${m.id}`,
    media_type: "movie",
    overview: "",
    backdrop: m.poster_path,
    rating: 0,
    date: "",
    local: true,
  };
}

// Cut long descriptions the way the banner design does.
export function truncate(str = "", n = 150) {
  return str.length > n ? str.slice(0, n - 1).trimEnd() + "…" : str;
}

export function formatRuntime(mins) {
  if (!mins) return "";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

// Pick the best YouTube video from TMDB's "videos" list.
export function pickTrailer(videos = []) {
  const yt = videos.filter((v) => v.site === "YouTube");
  return (
    yt.find((v) => v.type === "Trailer" && v.official) ||
    yt.find((v) => v.type === "Trailer") ||
    yt.find((v) => v.type === "Teaser") ||
    yt[0] ||
    null
  );
}
