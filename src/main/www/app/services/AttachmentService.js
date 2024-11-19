import axios from 'axios'

class AttachmentService {

    async getAttachments() {
        try {
            const response = await axios.get(`/api/attachments`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAttachmentByType(type) {
        try {
            const response = await axios.get(`/api/attachments?type=${type}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addAttachment(attachment) {
        try {
            const response = await axios.post(`/api/attachments`, attachment, {
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
            const response = await axios.put(`/api/attachments`, updatedAttachment, {
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
            await axios.delete(`/api/attachment/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting attachment:', error);
        }
    }
}

export default new AttachmentService();
