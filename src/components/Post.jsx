import React from "react"; 

const Post = ({ title, author, upvotes, comments, thumbnail }) => {
    return (
        <div className="post">
            <h3 className="post-title">{title}</h3>
            {thumbnail && (
                <div className="post-media">
                    <img src={thumbnail} alt="Post media" />
                </div>
            )}
            <p>
            Posted by {author} | Upvotes: {upvotes} | Comments: {comments}
            </p>
        </div>
    );
};

export default Post;
