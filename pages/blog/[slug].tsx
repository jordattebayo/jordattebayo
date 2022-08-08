import { useRouter } from 'next/router'
import { Layout} from "../../components";
import Image from "next/image"
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
    blogPost: BlogPost
  }

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CodeBlock = styled.code`
  color: ${(props) => props.theme.colors.senary};
  background-color: ${(props) => props.theme.colors.primary};
  margin: 2em 0;
  padding: 2em;
`

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
          <ContentWrapper>
            {blogPost.content.map(({ type, value },index) => {
              if(type == "text" ){
                return (
                  <p key={index}>{value}</p>
                )
              } 
              if (type == "codeblock") {
                return (
                  <CodeBlock key={index}>{value}</CodeBlock>
                )
              } else {
                return (
                  <div key={index}><Image src={value}  width="1" height="1" layout="responsive" /></div>
                )
              }

            })}
          </ContentWrapper>
        
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