import React from "react"; 
import extractMedia from "../features/extractData";


const Post = ( post ) => {
    const { title, author, ups, num_comments, thumbnail, selftext } = post;
    const { type: mediaType, url: mediaUrl } = extractMedia(post);
    console.log(mediaType);
    return (
        <div className="post">
            <h3 className="post-title">{title}</h3>

            <div className="post-media">
                {mediaType === "image" && <img src={mediaUrl} alt="" />}

                {mediaType === "video" && (
                <video controls src={mediaUrl} />
                )}

                {mediaType === "gif" && (
                <video autoPlay loop muted src={mediaUrl} />
                )}

                {mediaType === "external" && (
                <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
                    {mediaUrl}
                </a>
                )}

                {mediaType === "self" && <p>{selftext}</p>}


                {!mediaType && thumbnail && <img src={thumbnail} alt="Post thumbnail" />}
            </div>

            <p>
            Posted by {author} | Upvotes: {ups} | Comments: {num_comments}
            </p>
        </div>
    );
};

export default Post;

import PropTypes from "prop-types";
Post.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    num_comments: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    self_text: PropTypes.string,
};