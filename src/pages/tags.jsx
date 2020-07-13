import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"

function Tags({ data }) {
  const tags = data.allMdx.edges.map(item => {
    return item.node.frontmatter.tags
  })
  const map = new Map()
  for (let item of tags) {
    for (let tag of item) {
      if (map.has(tag)) {
        map.set(tag, map.get(tag) + 1)
      } else {
        map.set(tag, 1)
      }
    }
  }
  const tagArr = Array.from(map)
  tagArr.sort((a, b) => b[1] - a[1])
  const color = "#6C63FF"
  return (
    <Layout color={color} title="标签">
      <SEO title="Tags" />
      <div className="tag-container">
        {tagArr.map((item, index) => (
          <Link to={`/tag/${item[0]}`}>
            <Tag name={item[0]} count={item[1]} key={index} />
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query AllTagsQuery {
    allMdx {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`
