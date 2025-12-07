import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// Fetch tasks
export const getTasks = async () => {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response;
}

// Create a new task
export const createTask = async (task) => {
    const response = await axios.post(`${BASE_URL}/tasks`, task);
    return response;
}

// Mark task as completed
export const completeTask = async (id) => {
    const response = await axios.patch(`${BASE_URL}/tasks/${id}`);
    return response;
}
