import axios from 'axios';
import {fileToByteArray} from "@/app/util/fileToByteArray";

class AbilityService {

    async getAbilities() {
        try {
            const response = await axios.get(`/api/abilities`);
            return response.data;
        } catch (error) {
            console.error('Error fetching abilities:', error);
        }
    }

    async addAbility(ability) {
        try {
            ability.image = await fileToByteArray(ability.image);

            const response = await axios.post(`/api/abilities`, ability, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating ability:', error);
        }
    }

    async updateAbility(ability) {
        try {
            ability.image = await fileToByteArray(ability.image);

            const response = await axios.put(`/api/abilities`, ability, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
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
