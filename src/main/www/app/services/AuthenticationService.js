import axios from 'axios'

class AuthenticationService {
    getAccessToken() {
        // Get token from our custom cookie
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };
        
        return getCookie('auth_token');
    }

    async getAuthenticatedAxios() {
        try {
            const accessToken = this.getAccessToken();
            if (accessToken) {
                return axios.create({
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }
            console.log('No access token available, using unauthenticated axios');
            return axios;
        } catch (error) {
            console.log('No access token available, using unauthenticated axios');
            return axios;
        }
    }

    async makeAuthenticatedRequest(url, options = {}) {
        try {
            const accessToken = this.getAccessToken();
            if (accessToken) {
                return axios({
                    ...options,
                    url,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }
            console.log('Making unauthenticated request');
            return axios({ ...options, url });
        } catch (error) {
            console.log('Making unauthenticated request');
            return axios({ ...options, url });
        }
    }
}

export default new AuthenticationService();