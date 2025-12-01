import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostList";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { loadPosts } from "../redux/slices/postsSlice";
import makeSelectFilteredPosts from "../features/FilteredPostsSelector";
import { selectPostsStatus, selectPostsError } from "../features/postsSelector";

const PostsPage = () => {
  const { subreddit } = useParams();
  const dispatch = useDispatch();

  const cached = useSelector((state) => state.posts.itemsBySubreddit?.[subreddit]);

  const selectPosts = useMemo(() => makeSelectFilteredPosts(), []);
  const posts = useSelector((state) => selectPosts(state, subreddit));

  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  
  useEffect(() => {
    if (!subreddit) return;

    if (!cached) {
      dispatch(loadPosts(subreddit));
    }
  }, [subreddit, cached, dispatch]);

  return (
    <div className="posts-page">
      <Header />
      <SearchBar />
      <Filter />

      {status === 'loading' && <p>Loading posts...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && <PostList posts={posts} />}
    </div>
  );
};

export default PostsPage;
