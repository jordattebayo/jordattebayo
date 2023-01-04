import styled from "styled-components"
import Head from 'next/head'
import { BlogLayout, PostCard } from "../../components";
import type PostType from '../../interfaces/post'
import { getAllPosts } from "../../lib/api";
import { generateRssFeed } from "../../lib/feed";

const CardList = styled.ul`
  padding: 0;
  margin: 0;
  min-height: 67vh;
  background-color:${(props) => props.theme.colors.senary};
`

const CenterPostCards = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`

type BlogProps = {
  allPosts: PostType[]
}

export default function Blog({ allPosts } : BlogProps){
  return (
    <>
    <Head>
    <title>
      Jordan Booker's Blog
    </title>
    <meta name="title" content="Jordan Booker's Blog" />
    <meta name="description" content="My lightly techincal frontend blog" key="description" />
    <meta property="og:title" content="Jordan Booker's blog" key="title"/>
    <meta property="og:url" content={process.env.VERCEL_URL + "/blog"} key="url" />
    <meta property="og:description" content="My lightly techincal frontend blog" key="description"/>
    <meta name="theme-color" content="#1c1c1c"/>
    <meta name="twitter:card" content={process.env.VERCEL_URL + "/blog"} />
    </Head>
      <BlogLayout>
        <CardList>          
          {allPosts && allPosts.map((post, index) => {
            return (
              <CenterPostCards key={index}>
                <PostCard 
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                slug={post.slug}
                id={index}
                author={post.author}
                timeToRead={post.timeToRead}
                />
              </CenterPostCards>
            )
          })}
        </CardList>
      </BlogLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'timeToRead'
  ])
  await generateRssFeed();

  return {
    props: { allPosts },
  }
}