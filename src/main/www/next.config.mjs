const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${API_URL}/api/:path*`,
            },
            {
                source: '/login',
                destination: `${API_URL}/login`,
            },
        ];
    },
};

export default nextConfig;
