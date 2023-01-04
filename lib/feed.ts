import fs from "fs";
import { Feed } from "feed";
import { getAllPosts } from "./api";
import { parseISO } from "date-fns";

export const generateRssFeed = async () => {
  const posts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
  ]);
  const siteURL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const date = new Date();
  const author = {
    name: "Jordan booker",
    email: "jordan@jordanbooker.com",
    link: "www.jordanbooker.dev",
  };
  const feed = new Feed({
    title: "Jordan Booker's blog",
    description: "A lightly technical blog to reassure you it's really not you, it's simply that hard.",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Jordan Booker`,
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });
  console.log(siteURL);
  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.excerpt,
      author: [author],
      contributor: [author],
      date: parseISO(post.date),
    });
  });
  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
};