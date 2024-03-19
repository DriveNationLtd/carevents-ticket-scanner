import withPWAInit from "next-pwa"

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['wordpress-889362-4267074.cloudwaysapps.com', 'www.carevents.com'],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ["phpstack-889362-4370795.cloudwaysapps.com" /* or Codespace port forward url, no including scheme */, "localhost:3000"]
        }
    }
}

const withPWA = withPWAInit({
    dest: "public",
    register: true,
    swSrc: "/service-worker.js",
})

export default withPWA(nextConfig)