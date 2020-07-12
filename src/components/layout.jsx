import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "spaceship.svg" }) {
        publicURL
      }
    }
  `)
  //todo 目录会随着slug的改变而改变

  return (
    <div className="layout">
      <header>
        <div className="logo">
          <Link to="/">
            <img src={data.logo.publicURL} alt="blog logo" />
          </Link>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to='/archive'>Archive</Link>
            </li>
            <li>
              <Link to='/tags'>Tags</Link>
            </li>
            <li>
              <Link to='/'>GITHUB</Link>
            </li>
          </ul>
        </div>
      </header>
      {children}
      <footer></footer>
    </div>
  )
}

export default Layout
