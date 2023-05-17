/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images : {
    remotePatterns : [
      {
        hostname : "**",
        protocol : "https"
      }
    ]
  }
}

module.exports = nextConfig
