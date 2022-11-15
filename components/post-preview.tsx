import DateFormatter from './date-formatter'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
  title: string
  coverImage?: string
  date: string
  excerpt: string
  author?: Author
  slug: string
}

const PostPreview = ({
  title,
  date,
  excerpt,
  slug,
}: Props) => {
  return (
    <div>
      <div>
        {/* <CoverImage slug={slug} title={title} src={coverImage} /> */}
      </div>
      <h3 >
        <Link
          as={`/blog/${slug}`}
          href="/blog/[slug]"
        >
          {title}
        </Link>
      </h3>
      <div >
        <DateFormatter dateString={date} />
      </div>
      <p>{excerpt}</p>
      {/* <Avatar name={author.name} picture={author.picture} /> */}
    </div>
  )
}

export default PostPreview