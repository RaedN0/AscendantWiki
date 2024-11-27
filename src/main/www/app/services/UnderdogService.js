import axios from 'axios';

class UnderdogService {

    async getUnderdogs(page = 0, size = 10, sortColumn = 'score') {
        try {
            const response = await axios.get('/api/underdogs', {
                params: { page, size, sortColumn },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching underdogs:', error);
            throw error;
        }
    }

    async saveUnderdogs(file) {
        try {
            const formData = new FormData();
            formData.append("file", file);

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
