import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from "../redux/slices/appSlice";

export default function SearchBar() {
    const  dispatch = useDispatch();
    const searchTerm = useSelector(state => state.app.searchTerm);

    return (
        <div className="search-bar">
            <input 
                name='search-bar'
                type="text"
                value={searchTerm}
                placeholder="Search"
                onChange={e => dispatch(setSearchTerm(e.target.value))}
            />
            <button className="search-button" onClick={() => console.log('Searching for:', searchTerm)}>🔎</button>
        </div>
    );
}