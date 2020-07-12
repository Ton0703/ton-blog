import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "spaceship.svg" }) {
        publicURL
      }
    }
  `)

  const [visible, setVisible] = useState(true)
  const [isTop, setTop] = useState(true)
  const [menuVisible, setMenuVisible] = useState(false)

  const handleWheel = e => {
    e.deltaY > 0 ? setVisible(false) : setVisible(true)
  }

  const handleScroll = () => {
    const top = document.documentElement.scrollTop
    top === 0 ? setTop(true) : setTop(false)
  }

  const handleToggleClick = () => {
    setMenuVisible(!menuVisible)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll, false)
  }, [])

  return (
    <div className="layout" onWheel={e => handleWheel(e)}>
      <header className={`${isTop ? "top" : ""} ${visible ? "" : "visible"}`}>
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
            <li>
              <Link to="/">Github</Link>
            </li>
          </ul>
        </div>
        <div
          className={`visibleBtn ${menuVisible ? "on" : ""}`}
          onClick={handleToggleClick}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </header>
      <div className={`siderBar ${menuVisible ? "menuVisible" : ""}`}>
        <div className="closeMenu" onClick={() => setMenuVisible(false)}></div>
        <div className="siderMenu">
        <ul>
            <li>
              <Link to="/archive">Archive</Link>
            </li>
            <li>
              <Link to="/tags">Tags</Link>
            </li>
            <li>
              <Link to="/">Github</Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
      <footer></footer>
    </div>
  )
}

export default Layout
