const withSass = require('@zeit/next-sass')

const publicRuntimeConfig = {
    API_URL: process.env.APP_URL
}

module.exports = withSass({
    publicRuntimeConfig,
    assetPrefix: 'https://ids-vyas-puja.herokuapp.com'
})