import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedSubreddit } from "../redux/slices/appslice";
import Header from "./../components/Header.jsx";
import SearchBar from "./../components/SearchBar.jsx"; 
import SubredditButtons from "../components/SubredditButtons.jsx";

export default function LaunchPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSelectedSubreddit(null));
    }, [dispatch]);

    return (
        <div className="launch-page">
            <Header />
            <SearchBar />
            <SubredditButtons />
        </div>
    );
}