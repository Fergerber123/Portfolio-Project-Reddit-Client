import React from "react";
import Post from "./Post";
import PropTypes from "prop-types";

const PostList = ({ posts = [] }) => {

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array,
};

export default PostList;