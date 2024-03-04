import withPWAInit from "next-pwa"

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
};

const withPWA = withPWAInit({
    dest: "public",
});

export default withPWA(nextConfig);
