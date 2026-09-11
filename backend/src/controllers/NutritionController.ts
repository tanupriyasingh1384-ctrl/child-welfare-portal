import { Request, Response, NextFunction } from 'express';
import { NutritionService } from '../services/NutritionService';

export class NutritionController {
  constructor(private nutritionService: NutritionService) {}

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { childId, ageMonths, weightKg, heightCm, status } = req.body;
      const log = await this.nutritionService.logNutrition({
        childId,
        ageMonths: Number(ageMonths),
        weightKg: Number(weightKg),
        heightCm: Number(heightCm),
        status: status ? (status as string) : undefined,
      });

      res.status(201).json({
        success: true,
        data: log,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { childId, status } = req.query;
      const logs = await this.nutritionService.getNutritionLogs({
        childId: childId ? (childId as string) : undefined,
        status: status ? (status as string) : undefined,
      });

      res.status(200).json({
        success: true,
        count: logs.length,
        data: logs,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const log = await this.nutritionService.getNutritionLogById(id as string);

      res.status(200).json({
        success: true,
        data: log,
      });
    } catch (error) {
      next(error);
    }
  };
}
