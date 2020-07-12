import React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

function Archive({data}) {
    console.log(data)
    const posts = data.allMdx.edges
    const map = new Map()
    for(let post of posts){
        const {date} = post.node.frontmatter
        if(!map.has(date)){
            map.set(date, [])
        } 
        map.get(date).push(post)
    }
    console.log(map)
    const archiveArr = Array.from(map)
    return (
        <Layout>
            <SEO 
               title='archive'
            />
            {archiveArr.map((item, index) => (
                <div key={index}>
                    {item[0]}
                    {item[1].map((item, index) => (
                        <div key={index}>
                           <Link to={`/${item.node.frontmatter.slug}`}>
                             {item.node.frontmatter.title}
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </Layout>
    )
}

export default Archive

export const pageQuery = graphql`
    query {
  allMdx(sort: {order: DESC, fields: frontmatter___date}, filter: {}) {
    edges {
      node {
        id
        frontmatter {
          slug
          title
          date(formatString: "YYYY")
        }
      }
    }
  }
}

`
