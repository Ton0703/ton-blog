import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

function tag({ data }) {
  console.log(data)
  const posts = data.allMdx.edges
  return (
    <Layout>
      <SEO />
      {posts.map((item, index) => (
          <div>
              {item.node.id}
          </div>
      ))}
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
          }
        }
      }
    }
  }
`
