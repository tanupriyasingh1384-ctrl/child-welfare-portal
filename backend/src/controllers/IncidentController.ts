import { Request, Response, NextFunction } from 'express';
import { IncidentService } from '../services/IncidentService';

export class IncidentController {
  constructor(private incidentService: IncidentService) {}

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        childId,
        reporterName,
        reporterPhone,
        incidentType,
        locationDesc,
        district,
        riskLevel,
        description,
      } = req.body;

      const incident = await this.incidentService.reportIncident({
        childId,
        reporterName,
        reporterPhone,
        incidentType,
        locationDesc,
        district,
        riskLevel,
        description,
      });

      res.status(201).json({
        success: true,
        data: incident,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { riskLevel, status, childId, district } = req.query;
      const incidents = await this.incidentService.getIncidents({
        riskLevel: riskLevel ? (riskLevel as string) : undefined,
        status: status ? (status as string) : undefined,
        childId: childId ? (childId as string) : undefined,
        district: district ? (district as string) : undefined,
      });

      res.status(200).json({
        success: true,
        count: incidents.length,
        data: incidents,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const incident = await this.incidentService.getIncidentById(id as string);

      res.status(200).json({
        success: true,
        data: incident,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await this.incidentService.updateIncidentStatus(id as string, status as string);

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  };
}
