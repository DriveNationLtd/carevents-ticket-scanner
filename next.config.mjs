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
    register: true,
    swSrc: "/service-worker.js",
})

export default withPWA(nextConfig)