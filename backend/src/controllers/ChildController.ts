import { Request, Response, NextFunction } from 'express';
import { ChildService } from '../services/ChildService';

export class ChildController {
  constructor(private childService: ChildService) {}

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {
        fullName,
        ageYears,
        gender,
        guardianName,
        guardianPhone,
        villageOrCity,
        district,
        state,
        schoolOrCenterId,
      } = req.body;

      const child = await this.childService.registerChild({
        fullName,
        ageYears: ageYears ? Number(ageYears) : undefined,
        gender,
        guardianName,
        guardianPhone,
        villageOrCity,
        district,
        state,
        schoolOrCenterId,
      });

      res.status(201).json({
        success: true,
        data: child,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { district, villageOrCity, schoolOrCenterId } = req.query;
      const children = await this.childService.getChildren({
        district: district ? (district as string) : undefined,
        villageOrCity: villageOrCity ? (villageOrCity as string) : undefined,
        schoolOrCenterId: schoolOrCenterId ? (schoolOrCenterId as string) : undefined,
      });

      res.status(200).json({
        success: true,
        count: children.length,
        data: children,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const child = await this.childService.getChildById(id as string);

      res.status(200).json({
        success: true,
        data: child,
      });
    } catch (error) {
      next(error);
    }
  };
}
