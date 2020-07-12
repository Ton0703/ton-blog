exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              tags
            }
          }
        }
      }
    }
  `)

  //allPosts
  const postPerPage = 2
  const numPages = Math.ceil(data.allMdx.edges.length / postPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? "/" : `page=${i + 1}`,
      component: require.resolve("./src/templates/allPosts.js"),
      context: {
        limit: postPerPage,
        skip: i * postPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  //singlePost
  data.allMdx.edges.map((item) => {
      const id = item.node.id
      const slug = item.node.frontmatter.slug
      actions.createPage({
          path: slug,
          component: require.resolve('./src/templates/singlePost.js'),
          context: {id}
      })
  })

  //tag
 const tags = data.allMdx.edges
 const tagSet = new Set()
 tags.forEach(item => item.node.frontmatter.tags.forEach(tag => tagSet.add(tag)))
 tagSet.forEach(tag => {
     actions.createPage({
         path: `/tag/${tag}`,
         component: require.resolve('./src/templates/tag.js'),
         context: {
             targetTag: tag
         }
     })
 })
}
