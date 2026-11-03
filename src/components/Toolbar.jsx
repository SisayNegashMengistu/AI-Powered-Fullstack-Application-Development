import { useMemo, useState } from "react";
import { SORTS, TYPES, applyView, genreOptions } from "../utils/browse";
import classes from "./Toolbar.module.css";

// Holds the filter/sort choices for a list and returns the list to show.
export function useBrowseView(items) {
  const [type, setType] = useState("all");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("default");

  const genres = useMemo(() => genreOptions(items), [items]);
  const visible = useMemo(() => applyView(items, { type, genre, sort }), [items, type, genre, sort]);

  return { visible, toolbar: { type, setType, genre, setGenre, genres, sort, setSort, total: visible.length } };
}

// A row of controls: type tabs, genre dropdown, sort dropdown, result count.
// Pass `sorts` to override the sort options. Leave out setType / setGenre to hide those controls.
export function Toolbar({ type, setType, genre, setGenre, genres, sort, setSort, total, sorts = SORTS, typeOptionsOnly }) {
  // Categories page: Movies / TV Shows only, because a genre list belongs to one of them
  const typeTabs = typeOptionsOnly ? TYPES.filter((t) => t.value !== "all") : TYPES;
  return (
    <div className={classes.toolbar}>
      {setType && (
        <div className={classes.tabs} role="tablist" aria-label="Type">
          {typeTabs.map((t) => (
            <button
              key={t.value}
              role="tab"
              aria-selected={type === t.value}
              className={type === t.value ? classes.on : ""}
              onClick={() => setType(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className={classes.selects}>
        {setGenre && (
          <label>
            Genre
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="all">All genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        {total !== undefined && (
          <span className={classes.count}>
            {total} {total === 1 ? "title" : "titles"}
          </span>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
