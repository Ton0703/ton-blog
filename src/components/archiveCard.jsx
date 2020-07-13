import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

function ArchiveCard({ children, year, data }) {
    const point = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "point.svg" }) {
        publicURL
      }
    }
  `)
  return (
    <div className="archiveCard">
      <div className="archiveYear">{year}</div>
      <div className="archiveData">
        {data.map((item, index) => (
          <div key={index} className='archiveDataItem'>
            <Link to={`/${item.node.frontmatter.slug}`}>
              <div style={{width: '20px', height: '20px'}}>
                <img src={point.logo.publicURL} alt=''/>
              </div>
              {item.node.frontmatter.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArchiveCard
