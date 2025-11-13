import { createSelector } from '@reduxjs/toolkit';

const EMPTY_ARRAY = [];

export const selectItemsBySubreddit = state => state.posts.itemsBySubreddit;
export const selectPostsStatus = state => state.posts.status;
export const selectPostsError = state => state.posts.error;

// Factory that returns a memoized selector instance per component
export const makeSelectPostsBySubreddit = () =>
  createSelector(
    selectItemsBySubreddit,
    (_, subreddit) => subreddit,
    (itemsBySubreddit, subreddit) => {
      const result = itemsBySubreddit?.[subreddit] ?? EMPTY_ARRAY;
      console.log("Selector output for", subreddit, result);
      return result;
    }
  );
