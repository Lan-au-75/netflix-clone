/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/t/p/original/**',
            },

            {
                protocol: 'https',
                hostname: 'rb.gy',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
