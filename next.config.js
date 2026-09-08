/** @type {import('next').NextConfig} */
const nextConfig = {
  // The content folder is read at request time during revalidation, so it has to ship with the server bundle.
  outputFileTracingIncludes: { '/**': ['./content/**'] },
  async redirects() {
    return [
      { source: '/about', destination: '/#story', permanent: true },
      { source: '/work-with-me', destination: '/#work', permanent: true },
    ]
  },
}
module.exports = nextConfig
