/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.weatherbit.io'],
  },
  experimental: {
    appDir: true,
    //If you get the following error while using the `app` directory:
    // `TypeError: Super expression must either be null or a function`,
    // then add the serverComponentsExternalPackages to your `next.config.js
    serverComponentsExternalPackages: ['@tremor/react'],
  },
}

module.exports = nextConfig
