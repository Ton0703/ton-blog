import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/articleCard"

const Posts = ({ data, pageContext }) => {
  const posts = data.allMdx.edges
  const { numPages, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prePage = currentPage - 1 === 1 ? "/" : `/page=${currentPage - 1}`
  const nextPage = `/page=${currentPage + 1}`
  const color =
    "linear-gradient(-45deg, rgb(38, 44, 65) 0%, rgb(70, 80, 122) 100%)"
  return (
    <Layout color={color} title="文章">
      <SEO title='Home'/>
      <div className="article-container">
        {posts.map((item, index) => (
          <Card key={index} data={item.node.frontmatter}></Card>
        ))}
        <div className="pagination">
          <div
            className="pre"
            style={{
              pointerEvents: isFirst ? "none" : "auto",
              backgroundColor: isFirst && "#e7e7e7",
            }}
          >
            <Link to={prePage}>上一页</Link>
          </div>
          <div
            className="next"
            style={{
              pointerEvents: isLast ? "none" : "auto",
              backgroundColor: isLast && "#e7e7e7",
            }}
          >
            <Link to={nextPage}>下一页</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Posts

export const pageQuery = graphql`
  query AllPostQuery($skip: Int!, $limit: Int!) {
    allMdx(sort: {fields: frontmatter___date, order: DESC}, limit: $limit, skip: $skip) {
      edges {
        node {
          frontmatter {
            excerpt
            slug
            title
            date(formatString: "YYYY-MM-DD")
            tags
          }
        }
      }
    }
  }
`
