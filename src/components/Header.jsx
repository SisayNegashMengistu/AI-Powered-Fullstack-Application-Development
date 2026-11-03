import { useEffect, useRef, useState } from "react";
import { IoSearchOutline, IoNotificationsOutline, IoChevronDown } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import logo from "../assets/image/logo-trim.png";
import classes from "./Header.module.css";

// `view` links the item to a page in App.jsx; items without one are visual only
const NAV = [
  { label: "Home", view: "home" },
  { label: "TV Shows", view: "tv" },
  { label: "Movies", view: "movies" },
  { label: "New & Popular", view: "new" },
  { label: "My List", view: "mylist" },
  { label: "Categories", view: "categories" },
  { label: "Browse by Language" },
];
const MENU = [
  { label: "Account" },
  { label: "Help Center" },
  { label: "Sign out", divider: true },
];

function Header({ view, onNavigate, onSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const profileRef = useRef(null);

  // focus the input as soon as the search box expands
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  // close the dropdown when clicking anywhere else
  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const closeSearchIfEmpty = () => {
    if (!query.trim()) setSearchOpen(false);
  };

  const changeQuery = (value) => {
    setQuery(value);
    onSearch(value);
  };

  const closeSearch = () => {
    changeQuery("");
    setSearchOpen(false);
  };

  // going to a page also leaves search mode
  const go = (target) => {
    closeSearch();
    onNavigate(target);
  };

  return (
    <header className={classes.header}>
      <div className={classes.left}>
        <a
          href="/"
          aria-label="Netflix home"
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
        >
          <img className={classes.logo} src={logo} alt="Netflix" />
        </a>
        <nav aria-label="Primary">
          <ul className={classes.nav}>
            {NAV.map((item) => (
              <li key={item.label}>
                {item.view ? (
                  <button
                    className={view === item.view ? classes.active : ""}
                    onClick={() => go(item.view)}
                    aria-current={view === item.view ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a href="#">{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={classes.right}>
        <div className={classes.search}>
          {searchOpen ? (
            <input
              ref={inputRef}
              className={classes.searchInput}
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => changeQuery(e.target.value)}
              onBlur={closeSearchIfEmpty}
              onKeyDown={(e) => e.key === "Escape" && closeSearch()}
              aria-label="Search titles"
            />
          ) : null}
          <button
            className={classes.iconBtn}
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
            aria-label="Search"
          >
            <IoSearchOutline size={22} />
          </button>
        </div>

        <button className={`${classes.iconBtn} ${classes.bell}`} aria-label="Notifications">
          <IoNotificationsOutline size={22} />
          <span className={classes.dot} />
        </button>

        <div className={classes.profile} ref={profileRef}>
          <button
            className={classes.profileBtn}
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className={classes.avatar}>
              <FaRegUser size={13} />
            </span>
            <IoChevronDown
              size={16}
              className={`${classes.chevron} ${menuOpen ? classes.flip : ""}`}
            />
          </button>

          {menuOpen && (
            <ul className={classes.dropdown} role="menu">
              {MENU.map((m) => (
                <li
                  key={m.label}
                  role="menuitem"
                  className={m.divider ? classes.withDivider : ""}
                >
                  <a href="#">{m.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
