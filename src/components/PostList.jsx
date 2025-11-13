import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

const PostList = () => {
  const posts = useSelector((state) => state.posts.items);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;

import PropTypes from "prop-types";
PostList.propTypes = {
  subreddit: PropTypes.string.isRequired,
};