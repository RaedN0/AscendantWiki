import axios from 'axios';
import {fileToByteArray} from "@/app/util/fileToByteArray";

class PerkService {

    async getPerks() {
        try {
            const response = await axios.get(`/api/perks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching perks:', error);
        }
    }

    async addPerk(perk) {
        try {
            perk.image = await fileToByteArray(perk.image);

            const response = await axios.post(`/api/perks`, perk, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating perk:', error);
        }
    }

    async updatePerk(perk) {
        try {
            perk.image = await fileToByteArray(perk.image);

            const response = await axios.put(`/api/perks`, perk, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
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
