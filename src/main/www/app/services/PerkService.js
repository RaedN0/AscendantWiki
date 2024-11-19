import axios from 'axios';

class PerkService {

    async getAllPerks() {
        try {
            const response = await axios.get(`/api/perks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching perks:', error);
        }
    }

    async getPerkById(id) {
        try {
            const response = await axios.get(`/api/perks/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching perk by ID:', error);
        }
    }

    async createPerk({ name, description, type, image }) {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('type', type);
            formData.append('image', image);

            const response = await axios.post(`/api/perks`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating perk:', error);
        }
    }

    async updatePerk(id, { name, description, type, image }) {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('type', type);
            if (image) {
                formData.append('image', image);
            }

            const response = await axios.put(`/api/perks/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating perk:', error);
        }
    }

    async deletePerk(id) {
        try {
            await axios.delete(`/api/perks/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting perk:', error);
        }
    }
}

export default new PerkService();
