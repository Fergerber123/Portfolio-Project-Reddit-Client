import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedSubreddit } from "../redux/slices/appslice";
import { fetchSearchQuery } from "../api/fetchSearchQuery";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [lastQuery, setLastQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const runSearch = async () => {
        const trimmed = query.trim();

        if (trimmed.length < 2){
            setResults([]);
            return;
        }

        if (trimmed === lastQuery) {
            return; // prevents repeated search spam
        }

        try {
            const subs = await fetchSearchQuery(trimmed);
            setResults(subs);
            setLastQuery(trimmed);
        } catch (err) {
            console.error("Search failed:", err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            runSearch();
        }
    };

    const handleSelect = (sub) => {
        dispatch(setSelectedSubreddit(sub.display_name));
        navigate(`/r/${sub.display_name}`);
        setResults([]); // hide dropdown after selecting
        setQuery("");
        setLastQuery("");
    };

    return (
        <div className="search-bar">
            <input 
                name={"search-bar"}
                type="text"
                value={query}
                placeholder="Search for subreddits"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={runSearch}>
                🔎
            </button>

        {results.length > 0 && (
            <div className="search-results">
                {results.map((sub) => (
                    <button
                        key={sub.id}
                        className="search-result"
                        onClick={() => handleSelect(sub)}
                    >
                        r/{sub.display_name}
                    </button>
                ))}
            </div>
        )}
        </div>
    );
}
