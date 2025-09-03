import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("filmlyWatchlist") || "[]");
            if (Array.isArray(stored)) setWatchlist(stored);
        } catch { }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("filmlyWatchlist", JSON.stringify(watchlist));
        } catch { }
    }, [watchlist]);

    const isInWatchlist = (imdbID) => watchlist.some((m) => m.imdbID === imdbID);

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
            if (prev.some((m) => m.imdbID === movie.imdbID)) return prev;
            return [movie, ...prev].slice(0, 100);
        });
    };

    const removeFromWatchlist = (imdbID) => {
        setWatchlist((prev) => prev.filter((m) => m.imdbID !== imdbID));
    };

    const toggleWatchlist = (movie) => {
        setWatchlist((prev) => {
            if (prev.some((m) => m.imdbID === movie.imdbID)) {
                return prev.filter((m) => m.imdbID !== movie.imdbID);
            }
            return [movie, ...prev].slice(0, 100);
        });
    };

    const value = useMemo(
        () => ({ watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist }),
        [watchlist]
    );

    return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
};

export const useWatchlist = () => useContext(WatchlistContext);


