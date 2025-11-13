import React from "react"; 

const Post = ({ title, author, ups, num_comments, thumbnail }) => {
    return (
        <div className="post">
            <h3 className="post-title">{title}</h3>
            {thumbnail && (
                <div className="post-media">
                    <img src={thumbnail} alt="Post media" />
                </div>
            )}
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
};