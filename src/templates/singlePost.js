import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

function singlePost({data}) {
    console.log(data)
    return (
        <Layout>
            <SEO title={data.mdx.frontmatter.title} />
            test
        </Layout>
    )
}

export default singlePost

export const pageQuery = graphql`
   query MyQuery($id: String!) {
  mdx(id: {eq: $id}) {
    frontmatter {
      date
      title
      slug
    }
  }
}

`