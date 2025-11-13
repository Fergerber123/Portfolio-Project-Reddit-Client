export async function fetchRedditData(subreddit, useLocal = true) {
  if (useLocal) {
    try {
      const data = await import(`../data/${subreddit.replace("r/", "")}.json`);
      return data.default.data.children.map(c => c.data);
    } catch (err) {
      console.error(`Local data for ${subreddit} not found`, err);
      return [];
    }
  }


//  const response = await fetch(`https://www.reddit.com/${subreddit}.json`);
//  const json = await response.json();
//  return json.data.children.map(c => c.data);
}