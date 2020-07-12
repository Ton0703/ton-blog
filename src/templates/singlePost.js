import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"

function singlePost({ data }) {
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} />
      <div className="markdown-body">
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export default singlePost

export const pageQuery = graphql`
  query MyQuery($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date
        title
        slug
      }
      body
    }
  }
`
