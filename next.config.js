/** @type {import('next').NextConfig} */
const nextConfig = {
  // The content folder is read at request time during revalidation, so it has to ship with the server bundle.
  outputFileTracingIncludes: { '/**': ['./content/**', './private/pro/**'] },
  async redirects() {
    return [
      { source: '/about', destination: '/#story', permanent: true },
      { source: '/work-with-me', destination: '/#work', permanent: true },
      { source: '/agents', destination: '/pro#agents', permanent: true },
      { source: '/packs', destination: '/pro#packs', permanent: true },
      { source: '/shop', destination: '/pro', permanent: true },
    ]
  },
}
module.exports = nextConfig
