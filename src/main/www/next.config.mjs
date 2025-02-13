const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${API_URL}/api/:path*`,
            },
            {
                source: '/auth/login',
                destination: `${API_URL}/login`,
            },
            {
                source: '/auth/logout',
                destination: `${API_URL}/logout`,
            },
        ];
    },
};

export default nextConfig;
