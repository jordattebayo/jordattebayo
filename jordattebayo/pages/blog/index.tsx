import Link from "next/link";
import { Layout } from "../../components";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    image: string;
    role: string;
  }

interface BlogPostProps  {
    blogPosts: Array<BlogPost>
  }

export default function Blog({ blogPosts } : BlogPostProps){
    return (
        <>
        <Layout>
            <h1>Blog</h1>
            <ul>
            {blogPosts.map((blogPost) => {
                return (
                    <li key={blogPost.id}>
                        <Link href={{
                            pathname: '/blog/[slug]',
                            query: { slug: blogPost.slug },
                            }} passHref>
                            <a>{blogPost.title}</a>
                        </Link>
                    </li>
                )
            })}
            </ul>
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