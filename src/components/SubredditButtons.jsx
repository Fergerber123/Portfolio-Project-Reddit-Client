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
    navigate("/posts");
    };

    return (
        <div className="subreddit-buttons">
            {reccedSubs.map(sub => (
            <button key={sub} onClick={() => handleClick(sub)} >{sub}</button>
            ))}
        </div>
    );
}

const popularSubs = ["r/facepalm", "r/mildlyinfuriating", "r/funny", "r/pics"];
const count = 3;
const shuffled = [...popularSubs].sort(() => 0.5 - Math.random());
const reccedSubs = shuffled.slice(0, count);


