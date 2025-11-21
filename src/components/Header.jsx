import logo from "../assets/icons/logo.ico";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <Link to="/">   
                <img src={logo} alt="Logo" className="logo" />
                <h1>RedditLite</h1>
            </Link>
        </div>
    );
};