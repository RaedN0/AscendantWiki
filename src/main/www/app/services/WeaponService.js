import axios from 'axios'
import {fileToByteArray} from "@/app/util/fileToByteArray";

class WeaponService {

    async getWeapons() {
        try {
            const response = await axios.get(`/api/weapons`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addWeapon(weapon) {
        try {
            weapon.image = await fileToByteArray(weapon.image);

            const response = await axios.post(`/api/weapons`, weapon, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding weapon:', error);
        }
    }

    async updateWeapon(weapon) {
        try {
            weapon.image = await fileToByteArray(weapon.image);

            const response = await axios.put(`/api/weapons`, weapon, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating weapon:', error);
        }
    }

    async deleteWeapon(id) {
        try {
            await axios.delete(`/api/weapons/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting weapon:', error);
        }
    }
}

export default new WeaponService();
