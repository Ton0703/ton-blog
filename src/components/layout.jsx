import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

function Layout({ children, color, title, date }) {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "spaceship.svg" }) {
        publicURL
      }
    }
  `)

  const [visible, setVisible] = useState(true)
  const [isTop, setTop] = useState(true)

  const handleWheel = e => {
    e.deltaY > 0 && document.documentElement.scrollTop !== 0 ? setVisible(false) : setVisible(true)
  }

  const handleScroll = () => {
    const top = document.documentElement.scrollTop
    top === 0 ? setTop(true) : setTop(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll, false)
  }, [])

  return (
    <div className="layout" onWheel={e => handleWheel(e)}>
      <header className={`${isTop ? "top" : ""} ${visible ? "" : "visible"}`} style={{backgroundColor: isTop && 'rgba(255,255,255,0)'}}>
        <div className="logo">
          <Link to="/">
            <img src={data.logo.publicURL} alt="blog logo" />
          </Link>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/archive">Archive</Link>
            </li>
            <li>
              <Link to="/tags">Tags</Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="header" style={{background: color ? color : '#fff'}}>
          <div className="title">
          {title}
          </div>
          <div className="date">
            {date && date}
          </div>
      </div>
      {children}
      <footer style={{background: color}}>
          <div>
            Power By &nbsp;
            <a href="https://reactjs.org/">React.js</a>
            &nbsp; and &nbsp;
            <a href="https://www.gatsbyjs.org/">
              Gatsby.js
            </a>
          </div>
          <div>
          Copyright © 2020
          </div>
      </footer>
    </div>
  )
}

export default Layout
