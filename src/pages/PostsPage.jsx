import React from "react";
import { useSelector } from "react-redux";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";



const PostsPage = () => {
  
  const selectedSubreddit = useSelector(state => state.app.selectedSubreddit);


  return (
    <div className="posts-page">
      <SearchBar />
      <PostList subreddit={selectedSubreddit} />
    </div>
  );
};

export default PostsPage;
