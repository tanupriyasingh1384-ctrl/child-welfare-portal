export interface Child {
  id: string;
  fullName: string;
  ageYears?: number;
  gender?: string;
  guardianName?: string;
  guardianPhone?: string;
  villageOrCity: string;
  district: string;
  state: string;
  schoolOrCenterId?: string;
  createdAt: string;
  incidents?: IncidentReport[];
  nutritionRecords?: NutritionLog[];
  attendanceLogs?: AttendanceRecord[];
}

export interface IncidentReport {
  id: string;
  childId?: string;
  child?: Child;
  reporterName: string;
  reporterPhone: string;
  incidentType: string;
  locationDesc: string;
  district: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | string;
  description: string;
  reportedAt: string;
}

export interface NutritionLog {
  id: string;
  childId: string;
  child?: Child;
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  status: 'SEVERE_ACUTE_MALNUTRITION' | 'MODERATE' | 'NORMAL' | string;
  recordedAt: string;
}

export interface AttendanceRecord {
  id: string;
  childId: string;
  child?: Child;
  schoolId: string;
  consecutiveAbsences: number;
  riskFlagged: boolean;
  lastAttendDate: string;
  updatedAt: string;
}

export interface CreateChildDTO {
  fullName: string;
  ageYears?: number;
  gender?: string;
  guardianName?: string;
  guardianPhone?: string;
  villageOrCity: string;
  district: string;
  state: string;
  schoolOrCenterId?: string;
}

export interface CreateIncidentDTO {
  childId?: string;
  reporterName: string;
  reporterPhone: string;
  incidentType: string;
  locationDesc: string;
  district: string;
  riskLevel?: string;
  description: string;
}

export interface CreateNutritionDTO {
  childId: string;
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  status?: string;
}

export interface CreateAttendanceDTO {
  childId: string;
  schoolId: string;
  consecutiveAbsences: number;
  lastAttendDate?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  error?: {
    message: string;
    statusCode: number;
  };
}
