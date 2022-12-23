import { BlogLayout, PostCard } from "../../components";
import styled from "styled-components"
import Head from 'next/head'
import type PostType from '../../interfaces/post'
import { getAllPosts } from "../../lib/api";

const CardList = styled.ul`
  padding: 0;
  margin: 0;
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
  return {
    props: { allPosts },
  }
}