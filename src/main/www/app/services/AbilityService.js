import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class AbilityService {

    async getAllAbilities() {
        try {
            const response = await axios.get(`${API_URL}/api/abilities`);
            return response.data;
        } catch (error) {
            console.error('Error fetching abilities:', error);
        }
    }

    async getAbilityById(id) {
        try {
            const response = await axios.get(`${API_URL}/api/ability/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching ability by ID:', error);
        }
    }

    async createAbility({ name, description, cooldown, activationTime, image }) {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('cooldown', cooldown);
            formData.append('activationTime', activationTime);
            formData.append('image', image);

            const response = await axios.post(`${API_URL}/api/abilities`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating ability:', error);
        }
    }

    async updateAbility(id, { name, description, cooldown, activationTime, image }) {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('cooldown', cooldown);
            formData.append('activationTime', activationTime);
            if (image) {
                formData.append('image', image);
            }

            const response = await axios.put(`${API_URL}/api/abilities/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating ability:', error);
        }
    }

    async deleteAbility(id) {
        try {
            await axios.delete(`${API_URL}/api/abilities/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting ability:', error);
        }
    }
}

export default new AbilityService();
