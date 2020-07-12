import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'

const Posts = ({ data, pageContext }) => {
  const posts = data.allMdx.edges
  const { numPages, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prePage = currentPage - 1 === 1 ? "/" : `/page=${currentPage - 1}`
  const nextPage = `/page=${currentPage + 1}`
  return (
    <Layout>
        <SEO />
      {posts.map((item, index) => (
        <div key={index}>
          <Link to={`/${item.node.frontmatter.slug}`}>
            {item.node.frontmatter.title}
          </Link>
        </div>
      ))}
      <div className="pagination">
        <div style={{ pointerEvents: isFirst ? "none" : "auto" }}>
          <Link to={prePage}>
            <button>Pre</button>
          </Link>
        </div>
        <div style={{ pointerEvents: isLast ? "none" : "auto" }}>
          <Link to={nextPage}>
            <button>Next</button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Posts

export const pageQuery = graphql`
  query AllPostQuery($skip: Int!, $limit: Int!) {
    allMdx(limit: $limit, skip: $skip) {
      edges {
        node {
          frontmatter {
            excerpt
            slug
            title
            date
          }
        }
      }
    }
  }
`
