import axios from 'axios';
import {fileToByteArray} from "@/app/util/fileToByteArray";
import authenticationService from "@/app/services/AuthenticationService";

class PerkService {

    async getPerks() {
        try {
            // Use regular axios for public read access
            const response = await axios.get(`/api/perks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching perks:', error);
        }
    }

    async addPerk(perk) {
        try {
            perk.image = await fileToByteArray(perk.image);

            const authenticatedAxios = await authenticationService.getAuthenticatedAxios();
            const response = await authenticatedAxios.post(`/api/perks`, perk, {
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

            const authenticatedAxios = await authenticationService.getAuthenticatedAxios();
            const response = await authenticatedAxios.put(`/api/perks`, perk, {
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
            const authenticatedAxios = await authenticationService.getAuthenticatedAxios();
            await authenticatedAxios.delete(`/api/perks/${id}`);
        } catch (error) {
            console.error('Error deleting perk:', error);
        }
    }
}

export default new PerkService();
