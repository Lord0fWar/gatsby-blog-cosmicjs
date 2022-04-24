const each = require('lodash/each')
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const indexPage = path.resolve('./src/pages/index.js')
  createPage({
    path: `posts`,
    component: indexPage,
  })

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allCosmicjsPosts(sort: { fields: [created], order: DESC }, limit: 1000) {
              edges {
                node {
                  slug,
                  title
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allCosmicjsPosts.edges;

        each(posts, (post, index) => {
          const next = index === posts.length - 1 ? null : posts[index + 1].node;
          const previous = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: `posts/${post.node.slug}`,
            component: blogPost,
            context: {
              slug: post.node.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}
const path = require(`path`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Get the single post layout file
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  // Query the GraphQL to get our posts
  const result = await graphql(
    `
      {
        allCosmicjsPosts(
          sort: { fields: [created], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    throw result.errors
  }
  // Create blog posts pages.
  const posts = result.data.allCosmicjsPosts.edges
  // For each post in posts create a separate page
  posts.forEach((post, index) => {
    createPage({
      path: post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug
      }
    })
  })
}
