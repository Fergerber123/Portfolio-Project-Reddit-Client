// in-memory cache
const cache = {};
const lastFetchTime = {};

export async function fetchSubredditPosts(subreddit) {
  if (!subreddit) throw new Error("No subreddit provided");

  // Rate-limit: prevent fetching too often
  const now = Date.now();
  if (lastFetchTime[subreddit] && now - lastFetchTime[subreddit] < 6000) {
    throw new Error("Rate limit reached. Please wait a few seconds.");
  }
  lastFetchTime[subreddit] = now;

  // Return cached data if available
  if (cache[subreddit]) return cache[subreddit];

  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);

  if (response.status === 429) {
    throw new Error("Rate limit reached. Try again in a moment.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch posts.");
  }

  const data = await response.json();
  const posts = data.data.children
    .map(child => child.data)
    .filter(post => !post.stickied);

  // Save to cache
  cache[subreddit] = posts;

  return posts;
}
