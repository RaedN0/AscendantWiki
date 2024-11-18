import axios from 'axios'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class WeaponService {

    async getWeapons() {
        try {
            const response = await axios.get(`${API_URL}/api/weapons`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addWeapon(weapon) {
        try {
            const response = await axios.post(`${API_URL}/api/weapons`, weapon, {
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

    async updateWeapon(updatedWeapon) {
        try {
            const response = await axios.put(`${API_URL}/api/weapons`, updatedWeapon, {
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
            await axios.delete(`${API_URL}/api/weapons/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting weapon:', error);
        }
    }
}

export default new WeaponService();
