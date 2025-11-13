export async function useMockRedditData(subreddit) {
  try {
    const data = await import(`../data/${subreddit.replace("r/", "")}.json`);
    return data.default.data.children.map(c => c.data);
  } catch (err) {
    console.error(`Local data for ${subreddit} not found`, err);
    return [];
  }
};