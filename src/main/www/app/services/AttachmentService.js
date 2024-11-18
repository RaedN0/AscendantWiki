import axios from 'axios'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class AttachmentService {

    async getAttachments() {
        try {
            const response = await axios.get(`${API_URL}/api/attachments`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAttachmentByType(type) {
        try {
            const response = await axios.get(`${API_URL}/api/attachments?type=${type}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addAttachment(attachment) {
        try {
            const response = await axios.post(`${API_URL}/api/attachments`, attachment, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding attachment:', error);
        }
    }

    async updateAttachment(updatedAttachment) {
        try {
            const response = await axios.put(`${API_URL}/api/attachments`, updatedAttachment, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating attachment:', error);
        }
    }

    async deleteAttachment(id) {
        try {
            await axios.delete(`${API_URL}/api/attachment/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting attachment:', error);
        }
    }
}

export default new AttachmentService();
