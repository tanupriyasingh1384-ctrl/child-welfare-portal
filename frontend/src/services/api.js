import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const api = {
    // Children APIs
    getChildren: async (params) => {
        const res = await client.get('/api/children', { params });
        return res.data;
    },
    getChildById: async (id) => {
        const res = await client.get(`/api/children/${id}`);
        return res.data;
    },
    createChild: async (data) => {
        const res = await client.post('/api/children', data);
        return res.data;
    },
    // SOS Safety Incident APIs
    getIncidents: async (params) => {
        const res = await client.get('/api/incidents', { params });
        return res.data;
    },
    createIncident: async (data) => {
        const res = await client.post('/api/incidents', data);
        return res.data;
    },
    updateIncidentStatus: async (id, status) => {
        const res = await client.patch(`/api/incidents/${id}/status`, { status });
        return res.data;
    },
    // Anganwadi Growth & Nutrition APIs
    getNutritionLogs: async (params) => {
        const res = await client.get('/api/nutrition', { params });
        return res.data;
    },
    createNutritionLog: async (data) => {
        const res = await client.post('/api/nutrition', data);
        return res.data;
    },
    // Attendance & Dropout Tracker APIs
    getAttendanceRecords: async (params) => {
        const res = await client.get('/api/attendance', { params });
        return res.data;
    },
    getFlaggedDropoutRisks: async (schoolId) => {
        const res = await client.get('/api/attendance/flagged', {
            params: { schoolId },
        });
        return res.data;
    },
    createAttendanceRecord: async (data) => {
        const res = await client.post('/api/attendance', data);
        return res.data;
    },
};
