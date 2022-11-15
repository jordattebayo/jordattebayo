import Link from "next/link";
import { Layout, timeToReadCalculator } from "../../components";
import styled from "styled-components"
import type Post from '../../interfaces/post'
import PostPreview from "../../components/post-preview";
import { getAllPosts } from "../../lib/api";

const BlogList = styled.ul`
  margin: 0;
  padding: 0;
`

const HeroPost = styled.li`
  margin: 1em 0;
  list-style: none;
`

const BlogLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

type BlogProps = {
  allPosts: Post[]
}

export default function Blog({ allPosts } : BlogProps){
  return (
    <>
      <Layout>
        {/* <Head>
          <title>Next.js Blog Example with </title>
        </Head> */}
        <>
          
          {allPosts && allPosts.map((post) => {
            return (
              <PostPreview 
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              slug={post.slug}
              />
            )
          })}
        </>
      </Layout>
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
  ])

  return {
    props: { allPosts },
  }
}