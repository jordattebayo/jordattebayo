import { BlogLayout, PostCard } from "../../components";
import styled from "styled-components"
import Head from 'next/head'
import type Post from '../../interfaces/post'
import { getAllPosts } from "../../lib/api";

const CardList = styled.ul`
  
`

const CenterPostCards = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`

type BlogProps = {
  allPosts: Post[]
}

export default function Blog({ allPosts } : BlogProps){
  return (
    <>
      <BlogLayout>
        <Head>
          <title>Jordan's blog</title>
        </Head>
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
  ])

  return {
    props: { allPosts },
  }
}