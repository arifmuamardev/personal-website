import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { localPath } from '../lib/urls';

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime());
  return rss({
    title: "Arif Muamar's Blog",
    description: 'Research, software engineering, and personal writing.',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      description: post.data.description,
      link: localPath(`/${post.id}/`),
    })),
    customData: '<language>en-us</language>',
  });
}
