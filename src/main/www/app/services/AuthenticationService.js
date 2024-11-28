import axios from 'axios'

class AuthenticationService {
    async isAdmin() {
        try {
            const res = await axios.get(`/api/auth-status`, {
                withCredentials: true,
            });
            if (res.status === 200) {
                const {roles} = res.data;
                return roles.includes('ROLE_ADMIN');
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}

export default new AuthenticationService();