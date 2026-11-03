import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// One place for everything shared across the app:
//  - My List (favorites) and Liked titles, saved in localStorage so they survive a refresh
//  - which title's details window is open (and whether it should start playing)
const AppContext = createContext(null);

const read = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name)) || [];
  } catch {
    return [];
  }
};
const write = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch {
    /* storage full or blocked: the app still works, it just won't remember */
  }
};

export function AppProvider({ children }) {
  const [list, setList] = useState(() => read("nf:list"));
  const [liked, setLiked] = useState(() => read("nf:liked"));
  const [selected, setSelected] = useState(null); // { movie, autoplay }

  useEffect(() => write("nf:list", list), [list]);
  useEffect(() => write("nf:liked", liked), [liked]);

  // add to the front if missing, remove if present
  const flip = (setter) => (movie) =>
    setter((prev) =>
      prev.some((m) => m.key === movie.key)
        ? prev.filter((m) => m.key !== movie.key)
        : [movie, ...prev]
    );

  const toggleList = useCallback(flip(setList), []);
  const toggleLike = useCallback(flip(setLiked), []);
  const openDetails = useCallback((movie, autoplay = false) => setSelected({ movie, autoplay }), []);
  const closeDetails = useCallback(() => setSelected(null), []);

  const value = useMemo(
    () => ({
      list,
      liked,
      inList: (m) => list.some((x) => x.key === m.key),
      isLiked: (m) => liked.some((x) => x.key === m.key),
      toggleList,
      toggleLike,
      selected,
      openDetails,
      closeDetails,
    }),
    [list, liked, selected, toggleList, toggleLike, openDetails, closeDetails]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
