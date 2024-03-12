import withPWAInit from "next-pwa"

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['wordpress-889362-4267074.cloudwaysapps.com', 'www.carevents.com'],
    },
}

const withPWA = withPWAInit({
    dest: "public",
    swSrc: "service-worker.js",
    fallbacks: {
        document: "/fallback",
    }
    // sw: "service-worker.js",
})

export default withPWA(nextConfig)
