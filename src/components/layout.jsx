import React, { useEffect, useState, useCallback, useRef } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

function Layout({ children, color, title, date, catalogue }) {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "spaceship.svg" }) {
        publicURL
      }
    }
  `)

  

  //head
  const [visible, setVisible] = useState(true)
  const [isTop, setTop] = useState(true)
  
  //scrollup 菜单显示 scrolldown 菜单消失
  const ref = useRef(0)

  const handleScroll = useCallback(() => {
    const top = window.pageYOffset || document.documentElement.scrollTop
    top < 200 ? setTop(true) : setTop(false)
    if(top > ref.current){
      setVisible(false)
    } else {
      setVisible(true)
    } 
    ref.current = top
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll, false)
  }, [handleScroll])



  return (
    <div className="layout">
      <header
        className={`${isTop ? "top" : ""} ${visible ? "" : "visible"}`}
        style={{ backgroundColor: isTop && "rgba(255,255,255,0)" }}
      >
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
      <div className="header" style={{ background: color ? color : "#fff" }}>
        <div className="catalogue">{catalogue}</div>
        <div className="title">{title}</div>
        <div className="date">{date && date}</div>
      </div>
      {children}
      <footer style={{ background: color }}>
        <div>
          Power By &nbsp;
          <a href="https://reactjs.org/">React.js</a>
          &nbsp; and &nbsp;
          <a href="https://www.gatsbyjs.org/">Gatsby.js</a>
        </div>
        <div>Copyright © 2020</div>
      </footer>
    </div>
  )
}

export default Layout
