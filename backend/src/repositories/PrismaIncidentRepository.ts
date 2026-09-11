import { IncidentReport } from '@prisma/client';
import { prisma } from '../db/prisma';
import { IIncidentRepository, CreateIncidentDTO, IncidentFilterDTO } from './IIncidentRepository';

export class PrismaIncidentRepository implements IIncidentRepository {
  async create(data: CreateIncidentDTO): Promise<IncidentReport> {
    return prisma.incidentReport.create({
      data: {
        childId: data.childId,
        reporterName: data.reporterName,
        reporterPhone: data.reporterPhone,
        incidentType: data.incidentType,
        locationDesc: data.locationDesc,
        district: data.district,
        riskLevel: data.riskLevel ?? 'MEDIUM',
        description: data.description,
        status: 'OPEN',
      },
      include: {
        child: true,
      },
    });
  }

  async findAll(filter?: IncidentFilterDTO): Promise<IncidentReport[]> {
    return prisma.incidentReport.findMany({
      where: {
        ...(filter?.riskLevel && { riskLevel: filter.riskLevel }),
        ...(filter?.status && { status: filter.status }),
        ...(filter?.childId && { childId: filter.childId }),
        ...(filter?.district && { district: filter.district }),
      },
      include: {
        child: true,
      },
      orderBy: {
        reportedAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<IncidentReport | null> {
    return prisma.incidentReport.findUnique({
      where: { id },
      include: {
        child: true,
      },
    });
  }

  async updateStatus(id: string, status: string): Promise<IncidentReport> {
    return prisma.incidentReport.update({
      where: { id },
      data: { status },
      include: {
        child: true,
      },
    });
  }
}
