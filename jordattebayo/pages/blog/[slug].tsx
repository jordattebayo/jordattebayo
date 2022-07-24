import { useRouter } from 'next/router'
import { Layout} from "../../components";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    image: string;
    role: string;
  }

interface BlogPostProps  {
    blogPost: BlogPost
  }

const BlogPost = ( {blogPost}: BlogPostProps) => {
    const router = useRouter()

    return (
        <>
        <Layout>
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
        <>
          <h1>{blogPost.title}</h1>
          <p>{blogPost.slug}</p>
        </>
        )}
        </Layout>
      </>
    )
}

interface Params {
    params: {
      slug: string
    }
  }

export async function loadBlogPost(slug: string) {
  try {
    const getBlogPostBySlug = await fetch(`http://localhost:3000/api/blog/${slug}`)
    console.log(getBlogPostBySlug.body)
    const blogPost = await getBlogPostBySlug.json()
    return blogPost;
  } catch (error){ 
    console.log(error)
    return ""
  }

}
  
export async function getStaticProps({ params }: Params) {
  const blogPost = await loadBlogPost(params.slug || '')
  return {
    props: {
      blogPost,
    },
  }
}

export async function getStaticPaths() {
  try {
    const getAllBlogPosts = await fetch("http://localhost:3000/api/blog")
    const blogPosts = await getAllBlogPosts.json()
    const paths = blogPosts.map((blogPost) => {
      return { params: { slug: blogPost.slug.toString()}}
    })
    return {
      paths: paths,
      fallback: false,
    }

  } catch (err) {
    console.error(err)
    return { paths: [], fallback: false 
    } 
  }
}

export default BlogPost