import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"

function singlePost({ data, pageContext }) {
  const color = "rgb(255, 175, 96)"
  const { pre, next } = pageContext
  return (
    <Layout color={color} title={data.mdx.frontmatter.title} date={data.mdx.frontmatter.date}>
      <SEO title={data.mdx.frontmatter.title} />
      <div className="markdown-body">
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
        <div className="nav">
          <div className="nav-pre">
            <Link to={ pre && `/${pre.frontmatter.slug}`}>
            {pre && '←' + pre.frontmatter.title}
            </Link>
          </div>
          <div className="nav-next">
            <Link to={next && `/${next.frontmatter.slug}`}>
              {next && next.frontmatter.title + '→'}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default singlePost

export const pageQuery = graphql`
  query MyQuery($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        slug
      }
      body
    }
  }
`
