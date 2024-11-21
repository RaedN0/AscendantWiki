import axios from 'axios'

class WeaponService {

    async getWeapons() {
        try {
            const response = await axios.get(`/api/weapons`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addWeapon({name, baseDamage, fireRate, reloadSpeed, category, rarity, ammo, cost, image}) {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('baseDamage', baseDamage);
            formData.append('fireRate', fireRate);
            formData.append('reloadSpeed', reloadSpeed);
            formData.append('category', category);
            formData.append('rarity', rarity);
            formData.append('ammo', ammo);
            formData.append('cost', cost);
            formData.append('image', image);

            const response = await axios.post(`/api/weapons`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding weapon:', error);
        }
    }

    async updateWeapon(id, {name, baseDamage, fireRate, reloadSpeed, category, rarity, ammo, cost, image}) {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('baseDamage', baseDamage);
            formData.append('fireRate', fireRate);
            formData.append('reloadSpeed', reloadSpeed);
            formData.append('category', category);
            formData.append('rarity', rarity);
            formData.append('ammo', ammo);
            formData.append('cost', cost);
            if (image) {
                formData.append('image', image);
            }

            const response = await axios.put(`/api/weapons/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
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
