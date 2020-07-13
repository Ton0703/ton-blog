import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

function FeatureImage({ fixed }) {
  const data = useStaticQuery(graphql`
    query {
      imageSharp(fixed: { originalName: { eq: "office.jpeg" } }) {
        id
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  `)
  return (
    <div>
      <Img fixed={fixed ? fixed : data.imageSharp.fixed} />
    </div>
  )
}

export default FeatureImage
