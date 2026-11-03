# Netflix Clone — Phase 4, Week 1

React + Vite + Swiper + TMDB API.

## Run locally

```bash
npm install
cp .env.example .env     # then paste your TMDB API key into .env
npm run dev              # http://localhost:5173
```

Get a free key at https://www.themoviedb.org/settings/api.
**No key?** The app still runs in *demo mode* with the local posters in `src/Data/Data.js`.

## Features beyond the videos

- **Details window**: click any card (or the ⌄ button) to see synopsis, cast, genres, runtime/seasons, rating and "More like this".
- **Trailers**: Play opens the official YouTube trailer inside the window (needs the API key).
  Netflix's actual films/shows are licensed and can't be streamed by a clone, so trailers are the real video source.
- **Likes + My List**: 👍 and + work on cards, in the window and on the banner. Both are saved in `localStorage`
  and shown on the **My List** page.
- **Recently added on Netflix**: new rows built from TMDB (Netflix network series + movies streaming on Netflix, newest first).
  TMDB has no official "new on Netflix" feed, so this is the closest match.
- **Because you liked …**: a Home row of TMDB recommendations based on your most recent like.
- **Search, filter and sort**: search results and My List have All / Movies / TV Shows tabs, a genre dropdown,
  and sorting (A–Z, Z–A, highest rated, newest first) with a live title count.
- **Categories page**: pick Movies or TV, then a genre chip. TMDB does the sorting (most popular, highest rated,
  newest) and "Load more" fetches the next page. Without an API key it categorizes the local posters by genre.
- **Working pages**: Home, TV Shows, Movies, New & Popular, My List, Categories, and live search (type in the 🔍 box).

## Project layout (follows the 9 videos)

| Video | What | Where |
|---|---|---|
| 1 | Setup, assets, global styles | `src/assets/image`, `src/index.css` |
| 2 | Header (nav, search, bell, account dropdown) | `src/components/Header.jsx` |
| 3 | Banner (random Netflix Original, Bridgerton fallback) | `src/components/Banner.jsx` |
| 4 | Card (hover detail panel) | `src/components/Card.jsx` |
| 5 | Row + Slider (Swiper) | `src/components/Row.jsx`, `SlideShow.module.css` |
| 6 | API integration | `src/utils/axios.js`, `requests.js`, `constants.js` |
| 7 | Footer | `src/components/Footer.jsx` |
| 8 | Deployment | below |
| 9 | AI integration | below |

## Deploy (Video 8)

**Vercel / Netlify**: push to GitHub, import the repo, then
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_TMDB_API_KEY` = your key

(Vite bakes env vars in at build time, so set the variable *before* the build runs.
Note the key is visible in the browser bundle — fine for a learning project, but a
real app should proxy TMDB through its own backend.)

## Possible integrations (Video 9)

- **Login / sign-up** with authentication (Firebase Auth or a Node/Express API).
- **AI recommendations from liked movies.** `AppContext` already stores what the user
  likes (and a basic version, "Because you liked …", uses TMDB's recommendations endpoint). Send those titles + genres to an LLM (via your backend, never from the browser with
  a secret key) and ask for "5 similar titles as JSON", then look each up on TMDB's
  `/search/movie` endpoint and render them as a new "Because you liked…" `<Row />`.
