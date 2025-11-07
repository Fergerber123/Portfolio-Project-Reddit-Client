import Header from "./../components/Header.jsx";
import SearchBar from "./../components/SearchBar.jsx"; 
import SubredditButtons from "../components/SubredditButtons.jsx";

export default function LaunchPage() {
    return (
        <div className="launch-page">
            <Header />
            <SearchBar />
            <SubredditButtons />
        </div>
    );
}