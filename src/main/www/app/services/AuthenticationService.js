import axios from 'axios'

class AuthenticationService {
    async getUserInfo() {
        try {
            const res = await axios.get(`/api/auth-status`, {
                withCredentials: true,
            });
            if (res.status === 200) {
                const { username, roles } = res.data;
                return {
                    isAuthenticated: true,
                    isAdmin: roles?.includes('ROLE_ADMIN') || false,
                    username
                };
            }
            return {
                isAuthenticated: false,
                isAdmin: false,
                username: null
            };
        } catch (error) {
            return {
                isAuthenticated: false,
                isAdmin: false,
                username: null
            };
        }
    }

    async logout() {
        try {
            await axios.post(`/auth/logout`, {
                credentials: 'include',
            }).then(
                response => {
                    console.log('Logout successful');
                    window.location.reload();
                },
            );
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
}

export default new AuthenticationService();