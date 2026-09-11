import { IncidentReport } from '@prisma/client';

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

export interface IncidentFilterDTO {
  riskLevel?: string;
  status?: string;
  childId?: string;
  district?: string;
}

export interface IIncidentRepository {
  create(data: CreateIncidentDTO): Promise<IncidentReport>;
  findAll(filter?: IncidentFilterDTO): Promise<IncidentReport[]>;
  findById(id: string): Promise<IncidentReport | null>;
  updateStatus(id: string, status: string): Promise<IncidentReport>;
}
