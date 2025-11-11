import React from "react";
import Post from "./Post";
import { dummyPosts } from "../data/DummyData";

const PostList = ({ subreddit }) => {
  const postsToRender = dummyPosts[subreddit] || [];
  return (
    <div className="post-list">
      {postsToRender.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
