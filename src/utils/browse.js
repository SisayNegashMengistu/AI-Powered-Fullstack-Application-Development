// Sorting + filtering helpers shared by Search, My List and Categories.

export const SORTS = [
  { value: "default", label: "Best match" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
  { value: "rating", label: "Highest rated" },
  { value: "newest", label: "Newest first" },
];

export const TYPES = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Shows" },
];

// filter by type + genre, then sort. Never mutates the original list.
export function applyView(items, { type = "all", genre = "all", sort = "default" }) {
  let out = items.filter(
    (m) => (type === "all" || m.media_type === type) && (genre === "all" || m.genres.includes(genre))
  );

  if (sort === "az") out = [...out].sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === "za") out = [...out].sort((a, b) => b.title.localeCompare(a.title));
  else if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
  else if (sort === "newest") out = [...out].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return out;
}

// every genre that appears in the list, A–Z (feeds the genre dropdown)
export function genreOptions(items) {
  return [...new Set(items.flatMap((m) => m.genres))].sort();
}
