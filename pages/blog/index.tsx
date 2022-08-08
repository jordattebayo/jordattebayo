import Link from "next/link";
import { Layout, timeToReadCalculator } from "../../components";
import styled from "styled-components"

interface Content {
  type: string;
  value: string;
}

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    content: Array<Content>
  }

interface BlogPostProps  {
    blogPosts: Array<BlogPost>
  }

const BlogList = styled.ul`
  margin: 0;
  padding: 0;
`

const BlogPost = styled.li`
  margin: 1em 0;
  list-style: none;
`

const BlogLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export default function Blog({ blogPosts } : BlogPostProps){
    return (
        <>
        <Layout>
            <h1>/Blog</h1>
            <BlogList>
            {blogPosts.map((blogPost) => {
                return (
                    <BlogPost key={blogPost.id}>
                        <Link href={{
                            pathname: '/blog/[slug]',
                            query: { slug: blogPost.slug },
                            }} passHref>
                            <BlogLink>{blogPost.title + " (" + timeToReadCalculator(blogPost.content) + " minute read)"}</BlogLink>
                            
                        </Link>
                    </BlogPost>
                )
            })}
            </BlogList>
        </Layout>
        </>
    )
}

export async function loadBlogPost() {
    try {
      const getBlogPostBySlug = await fetch(`http://localhost:3000/api/blog`)
      const blogPosts = await getBlogPostBySlug.json()
      return blogPosts;
    } catch (error){ 
      console.log(error)
      return []
    }
  
}


export const getStaticProps = async () => {
    const blogPosts = await loadBlogPost()
    return {
      props: {
        blogPosts,
      },
    }
}