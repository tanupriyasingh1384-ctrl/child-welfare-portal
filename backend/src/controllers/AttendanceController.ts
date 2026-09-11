import { Request, Response, NextFunction } from 'express';
import { AttendanceService } from '../services/AttendanceService';

export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { childId, schoolId, consecutiveAbsences, lastAttendDate } = req.body;
      const record = await this.attendanceService.recordAttendance({
        childId,
        schoolId,
        consecutiveAbsences: Number(consecutiveAbsences),
        lastAttendDate,
      });

      res.status(201).json({
        success: true,
        data: record,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { schoolId, childId, riskFlagged } = req.query;
      const records = await this.attendanceService.getAttendanceRecords({
        schoolId: schoolId ? (schoolId as string) : undefined,
        childId: childId ? (childId as string) : undefined,
        riskFlagged: riskFlagged !== undefined ? riskFlagged === 'true' : undefined,
      });

      res.status(200).json({
        success: true,
        count: records.length,
        data: records,
      });
    } catch (error) {
      next(error);
    }
  };

  public getFlagged = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { schoolId } = req.query;
      const records = await this.attendanceService.getFlaggedDropoutRisks(
        schoolId ? (schoolId as string) : undefined
      );

      res.status(200).json({
        success: true,
        count: records.length,
        data: records,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const record = await this.attendanceService.getAttendanceRecordById(id as string);

      res.status(200).json({
        success: true,
        data: record,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateAbsences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { consecutiveAbsences, lastAttendDate } = req.body;

      const updated = await this.attendanceService.updateAbsences(
        id as string,
        Number(consecutiveAbsences),
        lastAttendDate
      );

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  };
}
