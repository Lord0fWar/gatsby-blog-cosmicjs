require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-cosmicjs',
      options: {
        bucketSlug: process.env.COSMIC_BUCKET,
        objectTypes: ['posts','settings'],
        apiAccess: {
          read_key: process.env.COSMIC_READ_KEY,
        },
        localMedia: true
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-cosmicjs`,
    options: {
      bucketSlug: b3dce130-c414-11ec-944c-0f80acf835ab, // Get this value in Bucket > Settings
      objectTypes: [`posts`], // Note it will result in GraphQL queries (allCosmicjsPosts, cosmicjsPosts)
      // If you have enabled read_key to fetch data (optional).
      apiAccess: {
        read_key: hRrWPbXPDFXvoY5wFfxenKrqwVN6pD1W1UAqi9boffPYIWRP1k // Get this value in Bucket > Settings
      },
      localMedia: true // Download media locally for gatsby image (optional)
    }
  }
]
