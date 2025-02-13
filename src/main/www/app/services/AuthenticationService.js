import axios from 'axios'

class AuthenticationService {

    async isAdmin() {
        try {
            const res = await axios.get(`/api/auth-status`, {
                withCredentials: true,
            });
            if (res.status === 200) {
                const {roles} = res.data;
                return roles?.includes('ROLE_ADMIN') || false;
            }
            return false;
        } catch (error) {
            return false;
        }
    };

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
    };

}

export default new AuthenticationService();