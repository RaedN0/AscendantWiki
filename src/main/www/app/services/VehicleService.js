import axios from 'axios';
import {fileToByteArray} from "@/app/util/fileToByteArray";

class VehicleService {

    async getVehicles() {
        try {
            const response = await axios.get(`/api/vehicles`);
            return response.data;
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    }

    async addVehicle(vehicle) {
        try {
            vehicle.image = await fileToByteArray(vehicle.image);

            const response = await axios.post(`/api/vehicles`, vehicle, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    }

    async updateVehicle(vehicle) {
        try {
            vehicle.image = await fileToByteArray(vehicle.image);

            const response = await axios.put(`/api/vehicles`, vehicle, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    }

    async deleteVehicle(id) {
        try {
            await axios.delete(`/api/vehicles/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    }
}

export default new VehicleService();
