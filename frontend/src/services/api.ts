import axios from 'axios';
import {
  Child,
  IncidentReport,
  NutritionLog,
  AttendanceRecord,
  CreateChildDTO,
  CreateIncidentDTO,
  CreateNutritionDTO,
  CreateAttendanceDTO,
  ApiResponse,
} from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Children APIs
  getChildren: async (params?: { district?: string; villageOrCity?: string; schoolOrCenterId?: string }) => {
    const res = await client.get<ApiResponse<Child[]>>('/api/children', { params });
    return res.data;
  },

  getChildById: async (id: string) => {
    const res = await client.get<ApiResponse<Child>>(`/api/children/${id}`);
    return res.data;
  },

  createChild: async (data: CreateChildDTO) => {
    const res = await client.post<ApiResponse<Child>>('/api/children', data);
    return res.data;
  },

  // SOS Safety Incident APIs
  getIncidents: async (params?: { riskLevel?: string; status?: string; childId?: string; district?: string }) => {
    const res = await client.get<ApiResponse<IncidentReport[]>>('/api/incidents', { params });
    return res.data;
  },

  createIncident: async (data: CreateIncidentDTO) => {
    const res = await client.post<ApiResponse<IncidentReport>>('/api/incidents', data);
    return res.data;
  },

  updateIncidentStatus: async (id: string, status: string) => {
    const res = await client.patch<ApiResponse<IncidentReport>>(`/api/incidents/${id}/status`, { status });
    return res.data;
  },

  // Anganwadi Growth & Nutrition APIs
  getNutritionLogs: async (params?: { childId?: string; status?: string }) => {
    const res = await client.get<ApiResponse<NutritionLog[]>>('/api/nutrition', { params });
    return res.data;
  },

  createNutritionLog: async (data: CreateNutritionDTO) => {
    const res = await client.post<ApiResponse<NutritionLog>>('/api/nutrition', data);
    return res.data;
  },

  // Attendance & Dropout Tracker APIs
  getAttendanceRecords: async (params?: { schoolId?: string; childId?: string; riskFlagged?: boolean }) => {
    const res = await client.get<ApiResponse<AttendanceRecord[]>>('/api/attendance', { params });
    return res.data;
  },

  getFlaggedDropoutRisks: async (schoolId?: string) => {
    const res = await client.get<ApiResponse<AttendanceRecord[]>>('/api/attendance/flagged', {
      params: { schoolId },
    });
    return res.data;
  },

  createAttendanceRecord: async (data: CreateAttendanceDTO) => {
    const res = await client.post<ApiResponse<AttendanceRecord>>('/api/attendance', data);
    return res.data;
  },
};
