import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from '../components/articleCard'

function tag({ data, pageContext }) {
  const posts = data.allMdx.edges
  const { targetTag } = pageContext
  return (
    <Layout color="#00B0FF" title={targetTag}>
      <SEO title={targetTag} />
      <div className="tags">
        {posts.map((item, index) => (
          <Card key={index} data={item.node.frontmatter}></Card>
        ))}
      </div>
    </Layout>
  )
}

export default tag

export const tagQuery = graphql`
  query tagQuery($targetTag: String!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { tags: { eq: $targetTag } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            date(formatString: "YYYY-MM-DD")
            excerpt
            featureImage
            tags
          }
        }
      }
    }
  }
`
