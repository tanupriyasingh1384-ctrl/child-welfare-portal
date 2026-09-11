import { IncidentReport } from '@prisma/client';
import { IIncidentRepository, CreateIncidentDTO, IncidentFilterDTO } from '../repositories/IIncidentRepository';
import { AppError } from '../middleware/errorHandler';

export class IncidentService {
  constructor(private incidentRepo: IIncidentRepository) {}

  async reportIncident(data: {
    childId?: string;
    reporterName: string;
    reporterPhone: string;
    incidentType: string;
    locationDesc: string;
    district: string;
    riskLevel?: string;
    description: string;
  }): Promise<IncidentReport> {
    if (
      !data.reporterName ||
      !data.reporterPhone ||
      !data.incidentType ||
      !data.locationDesc ||
      !data.district ||
      !data.description
    ) {
      throw new AppError(
        'reporterName, reporterPhone, incidentType, locationDesc, district, and description are required fields.',
        400
      );
    }

    const payload: CreateIncidentDTO = {
      childId: data.childId,
      reporterName: data.reporterName,
      reporterPhone: data.reporterPhone,
      incidentType: data.incidentType,
      locationDesc: data.locationDesc,
      district: data.district,
      riskLevel: data.riskLevel ?? 'MEDIUM',
      description: data.description,
    };

    return this.incidentRepo.create(payload);
  }

  async getIncidents(filter?: IncidentFilterDTO): Promise<IncidentReport[]> {
    return this.incidentRepo.findAll(filter);
  }

  async getIncidentById(id: string): Promise<IncidentReport> {
    const incident = await this.incidentRepo.findById(id);
    if (!incident) {
      throw new AppError(`Incident report with ID '${id}' not found.`, 404);
    }
    return incident;
  }

  async updateIncidentStatus(id: string, status: string): Promise<IncidentReport> {
    await this.getIncidentById(id);
    return this.incidentRepo.updateStatus(id, status);
  }
}
