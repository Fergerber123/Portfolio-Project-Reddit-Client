import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleSelectedPost } from "../redux/slices/postsSlice";

const ClassicPost = ({ id, title, author, ups, num_comments, thumbnail }) => {

    const dispatch = useDispatch();

    const placeholder =
        "https://www.redditstatic.com/icon.png";

    const isRealThumbnail =
        thumbnail &&
        thumbnail.startsWith("http") &&
        !thumbnail.includes("default") &&
        !thumbnail.includes("self");

    const displayThumb = isRealThumbnail ? thumbnail : placeholder;

    return (
        <div className="post-tile" onClick={() => dispatch(toggleSelectedPost(id))}>
            <div className="post-thumbnail">
                {thumbnail && <img src={displayThumb} alt="" />}
            </div>
            <div className="post-meta" >
                <span>{author}</span>
                <h3>{title}</h3>
                <span>{ups} • {num_comments}</span>
            </div>
        </div>
    );
};


ClassicPost.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    num_comments: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
};

export default ClassicPost;