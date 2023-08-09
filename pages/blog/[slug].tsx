import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'
import { BlogLayout, PostBody } from "../../components";
import DateFormatter from '../../components/date-formatter'


type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Heading = styled.div`
  margin: 4rem 0;
`

const Article = styled.article`
`

const H2 = styled.h3`
  font-size: 4rem;
  max-width: 750px;
  margin: 0;
`
const Lead = styled.p`
  margin: 4rem auto;
  font-size: clamp(20px, 2vw, 30px);
  line-height: 1.5;
  font-weight: 700;
  max-width: 860px;
  color: ${({theme}) => theme.colors.tertiary};
  @media(max-width: ${(props) => props.theme.widths.tablet}) {
    padding: 0;
  }
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: clamp(400px, 100vw, 1600px);
  width: clamp(200px, 68vw, 1068px); 
  margin: auto;
`

const CardText = styled.p`
  color: ${({theme}) => theme.colors.primary};
`

const ReadTimeText = styled(CardText)`
`

const ThemeText = styled.p`
  color: ${({theme}) => theme.colors.primary};
`

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
    <Head>
    <title>
      {post.title}
    </title>
    <meta name="title" content={post.title}  />
    <meta name="description" content={post.excerpt} key="description" />
    <meta property="og:title" content={post.title} key="title"/>
    <meta property="og:type" content="article" key="type" />
    <meta property="og:url" content={process.env.NEXT_PUBLIC_VERCEL_URL + post.slug} key="url" />
    <meta property="og:image" content={post.coverImage.path} key="image" />
    <meta property="og:description" content={post.excerpt} key="descriptionOG"/>
    <meta name="twitter:card" content={post.coverImage.path} />
    <meta name="article:published_time" content={post.date} />
    <meta name="article:author" content={post.author.name} />
    {/* add tags later <meta name="article:tag" content={post.author.name} /> */}

    </Head>
    <BlogLayout >
      <div>
        {router.isFallback ? (
          <div><ThemeText>Loading…</ThemeText></div>
        ) : (
          <>
            <Article>
              <Heading>
                <H2>{post.title}</H2>
                <ReadTimeText>{post.timeToRead} read</ReadTimeText>
              </Heading>
              { post.coverImage.path ? <ImageContainer>
                <Image
                  src={post.coverImage.path} 
                  fill
                  alt={post.coverImage.alt} 
                />
              </ImageContainer> : null}
              <Lead>{post.lead}</Lead>
              <PostBody content={post.content} />
              <DateFormatter dateString={post.date} />
              <div><ThemeText>By: {post.author.name}</ThemeText></div>
            </Article>
          </>
        )}
      </div>
    </BlogLayout>
    </>
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
    'timeToRead',
    'lead'
  ])
  const content = await markdownToHtml(post.content || '')
  console.log(content)
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

