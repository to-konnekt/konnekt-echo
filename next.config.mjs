/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://zabelin-bot.llmplay.ru:8000/:path*',
            },
            {
                source: '/cloud/api/:path*',
                destination: 'https://llm.api.cloud.yandex.net/:path*',
            },
            {
                source: '/speechkit/api/:path*',
                destination: 'https://tts.api.cloud.yandex.net/:path*'
            }
        ]
    },
    reactStrictMode: false
};

export default nextConfig;
