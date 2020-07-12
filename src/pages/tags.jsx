import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

function Tag({data}) {
    const tags = data.allMdx.edges.map(item => {
        return item.node.frontmatter.tags
    })
    const map = new Map()
    for(let item of tags){
        for(let tag of item){
            if(map.has(tag)){
                map.set(tag, map.get(tag) + 1)
            } else {
                map.set(tag, 1)
            }
        }
    } 
    const tagArr = Array.from(map)
    tagArr.sort((a, b) => b[1] - a[1])
    console.log(tagArr)
  return (
    <Layout>
      <SEO title="Tags" />
      {tagArr.map((item, index) => (
          <div className='tag-wrapper'>
              <span>
                  <Link to={`/tag/${item[0]}`}>
                     {item[0]}
                  </Link>
              </span>
              <span>
                  {item[1]}
              </span>
          </div>
      ))}
    </Layout>
  )
}

export default Tag

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
