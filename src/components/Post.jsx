import React from "react"; 
import { useDispatch } from "react-redux";
import extractMedia from "../features/extractMedia";
import PropTypes from "prop-types";
import { toggleSelectedPost } from "../redux/slices/postsSlice";



const Post = ({ id, title, author, ups, num_comments, thumbnail, selftext, permalink, ...post }) => {

    const { type: mediaType, url: mediaUrl } = extractMedia(post);

    const dispatch = useDispatch();

    return (
        <div className="post-tile" onClick={() => dispatch(toggleSelectedPost(id))}>
            <div className="post-meta" >
                <span>{author}</span>
                <h3>{title}</h3>
                <span>{ups} • {num_comments}</span>
                <a
                    href={`https://www.reddit.com${permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-on-reddit"
                >
                    View on Reddit
                </a>
            </div>
            <div className="post-media-container">
                {mediaType === "image" && (
                <img src={mediaUrl} alt="" className="post-media-img" />
                )}

                {mediaType === "video" && (
                <video controls className="post-media-img" src={mediaUrl} />
                )}

                {mediaType === "gif" && (
                <video autoPlay loop muted className="post-media-img" src={mediaUrl} />
                )}

                {mediaType === "external" && (
                <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
                    {mediaUrl}
                </a>
                )}

                {mediaType === "self" && <p className="post-text">{selftext}</p>}

                {!mediaType && thumbnail && (
                <img src={thumbnail} alt="Post thumbnail" className="post-media-img" />
                )}
            </div>
        </div>
    );
};

Post.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    num_comments: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    self_text: PropTypes.string,
    permalink: PropTypes.string.isRequired,
    post: PropTypes.object,
};

export default Post;