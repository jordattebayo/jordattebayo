import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: {
    path: string
    alt: string
  }
  author: Author
  excerpt: string
  ogImage: {
    url: string
    alt: string
  }
  content: string
  timeToRead: string
  lead: string
}

export default PostType