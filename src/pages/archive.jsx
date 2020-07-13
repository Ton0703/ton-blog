import React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Card from '../components/archiveCard'

function Archive({data}) {
    const posts = data.allMdx.edges
    const map = new Map()
    for(let post of posts){
        const {date} = post.node.frontmatter
        if(!map.has(date)){
            map.set(date, [])
        } 
        map.get(date).push(post)
    }
    const archiveArr = Array.from(map)
    const color = '#00BFA6'
    return (
        <Layout color={color} title='归档'>
            <SEO 
               title='Archive'
            />
            <div className="archive">
            {archiveArr.map((item, index) => (
                <Card key={index} year={item[0]} data={item[1]}>
                    {item[0]}
                    {item[1].map((item, index) => (
                        <div key={index}>
                           <Link to={`/${item.node.frontmatter.slug}`}>
                             {item.node.frontmatter.title}
                            </Link>
                        </div>
                    ))}
                </Card>
            ))}
            </div>
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
