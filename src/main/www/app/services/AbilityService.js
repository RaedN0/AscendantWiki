import axios from 'axios';

class AbilityService {

    async getAllAbilities() {
        try {
            const response = await axios.get(`/api/abilities`);
            return response.data;
        } catch (error) {
            console.error('Error fetching abilities:', error);
        }
    }

    async getAbilityById(id) {
        try {
            const response = await axios.get(`/api/ability/${id}`);
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

            const response = await axios.post(`/api/abilities`, formData, {
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

            const response = await axios.put(`/api/abilities/${id}`, formData, {
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
            await axios.delete(`/api/abilities/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting ability:', error);
        }
    }
}

export default new AbilityService();
