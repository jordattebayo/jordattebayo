import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'
import { BlogLayout, PostBody } from "../../components";

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const H2 = styled.h3`
  font-size: 4rem;
  max-width: 750px;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: clamp(200px, 50vh, 814px);
  position: relative;

`

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <BlogLayout >
      <div>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <article >
              <Head>
                <title>
                  {post.title}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <H2>{post.title}</H2>
              <ImageContainer>
                <Image
                  src={post.coverImage} 
                  fill
                  alt="image for post"
                />
              </ImageContainer>
              <PostBody content={post.content} />
              <div>{post.date}</div>
              <div>{post.author.name}</div>
            </article>
          </>
        )}
      </div>
    </BlogLayout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}