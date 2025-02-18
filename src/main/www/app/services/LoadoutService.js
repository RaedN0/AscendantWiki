import axios from 'axios';

class LoadoutService {
    async getLoadouts() {
        try {
            const response = await axios.get('/api/loadouts');
            return response.data;
        } catch (error) {
            console.error('Error fetching loadouts:', error);
            throw error;
        }
    }

    async getUserLoadouts(username) {
        try {
            const response = await axios.get(`/api/loadouts/user/${username}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user loadouts:', error);
            throw error;
        }
    }

    async createLoadout(loadout) {
        console.log(loadout);
        try {
            const response = await axios.post('/api/loadouts', loadout, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating loadout:', error);
            throw error;
        }
    }

    async deleteLoadout(id) {
        try {
            await axios.delete(`/api/loadouts/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting loadout:', error);
            throw error;
        }
    }
}

const loadoutService = new LoadoutService();
export default loadoutService;