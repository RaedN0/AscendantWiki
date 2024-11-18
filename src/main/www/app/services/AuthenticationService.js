import axios from 'axios'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class AuthenticationService {

    async checkAuthStatus() {
        try {
            const res = await axios.get(`${API_URL}/api/auth-status`, {
                withCredentials: true,
            });

            if (res.status === 200) {
                const { roles } = res.data;
                return roles.includes('ROLE_ADMIN');
            }

            return false;
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    }

}
export default new AuthenticationService();