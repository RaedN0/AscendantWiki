import axios from 'axios';

class UnderdogService {

    async getUnderdogs() {
        try {
            const response = await axios.get('/api/underdogs');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async saveUnderdogs(file) {
        try {
            // Prepare the form data
            const formData = new FormData();
            formData.append("file", file);

            // Send the file as multipart/form-data
            const response = await axios.post(`/api/underdogs`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
}

export default new UnderdogService();
