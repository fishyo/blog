import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";
import { marked } from "marked";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: await Promise.all(
      sortedPosts.map(async ({ data, body, slug }) => ({
        link: `${SITE.website}posts/${slug}/`,
        title: data.title,
        description: await marked.parse(body),
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),
        categories: data.tags,
        content: await marked.parse(body),
      }))
    ),
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    customData: `<language>en-us</language>`,
  });
}
