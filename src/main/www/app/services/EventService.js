import axios from 'axios'

class EventService {

    async getEvents() {
        try {
            const response = await axios.get(`/api/events`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addEvent(event) {
        try {
            const response = await axios.post(`/api/events`, event, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding event:', error);
        }
    }

    async updateEvent(updatedEvent) {
        try {
            const response = await axios.put(`/api/events`, updatedEvent, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating event:', error);
        }
    }

    async deleteEvent(id) {
        try {
            await axios.delete(`/api/events/${id}`, {
                withCredentials: true,
            });
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }
}

export default new EventService();
