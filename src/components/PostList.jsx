import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import ClassicPost from "./ClassicPost";
import PropTypes from "prop-types";

const PostList = ({ posts = [] }) => {

  const selectedPosts = useSelector((state) => state.posts.selectedPosts);

 return (
  <div className="post-list">
    {posts.map((post) => {
      const Component = selectedPosts.includes(post.id)
        ? Post
        : ClassicPost;

      return <Component key={post.id} {...post} />;
    })}
  </div>
);
};

PostList.propTypes = {
  posts: PropTypes.array,

};

export default PostList;