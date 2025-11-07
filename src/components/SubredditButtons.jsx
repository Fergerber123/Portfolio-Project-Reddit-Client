export default function SearchBar() {
    return (
        <div className="subreddit-buttons">
            {reccedSubs.map(sub => (
            <button key={sub}>{sub}</button>
            ))}
        </div>
    );
}

const popularSubs = ["r/facepalm", "r/mildlyinfuriating", "r/techsupportgore", "r/therewasanattempt", "r/2healthbars", "r/crappydesign", "r/dontdeadopeninside", "r/softwaregore", "r/assholedesign", "r/expected", "r/unexpected", "r/funny", "r/pics", "r/gifs"];
const count = 3;
const shuffled = [...popularSubs].sort(() => 0.5 - Math.random());
const reccedSubs = shuffled.slice(0, count);


