import axios from 'axios'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class WeaponService {

    async getWeapons() {
        try {
            const response = await axios.get(`${API_URL}/api/weapons`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new WeaponService();
