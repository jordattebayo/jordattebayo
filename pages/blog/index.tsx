import { BlogLayout, PostCard } from "../../components";
import styled from "styled-components"
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