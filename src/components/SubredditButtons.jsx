import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubreddit } from "../redux/slices/appslice";




export default function SubredditButtons() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedSubreddit = useSelector(state => state.app.selectedSubreddit);
    useEffect(() => {
        console.log("Selected subreddit (updated):", selectedSubreddit);
    }, [selectedSubreddit]);


    const handleClick = (subreddit) => {
    dispatch(setSelectedSubreddit(subreddit));
    navigate(`r/${subreddit}`);
    };

    return (
        <div className="subreddit-buttons">
            {reccedSubs.map(sub => (
            <button key={"r/" + sub} onClick={() => handleClick(sub)} >r/{sub}</button>
            ))}
        </div>
    );
}

const popularSubs = ["facepalm", "mildlyinfuriating", "funny", "pics", "memes"];
const count = 3;
const shuffled = [...popularSubs].sort(() => 0.5 - Math.random());
const reccedSubs = shuffled.slice(0, count);


