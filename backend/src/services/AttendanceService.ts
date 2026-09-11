import { AttendanceRecord } from '@prisma/client';
import { IAttendanceRepository, AttendanceFilterDTO } from '../repositories/IAttendanceRepository';
import { AppError } from '../middleware/errorHandler';

export class AttendanceService {
  private readonly ABSENCE_THRESHOLD = 3;

  constructor(private attendanceRepo: IAttendanceRepository) {}

  /**
   * Auto-flags student for dropout risk if consecutiveAbsences >= threshold (3 days)
   */
  public evaluateDropoutRisk(consecutiveAbsences: number): boolean {
    return consecutiveAbsences >= this.ABSENCE_THRESHOLD;
  }

  async recordAttendance(data: {
    childId: string;
    schoolId: string;
    consecutiveAbsences: number;
    lastAttendDate?: string | Date;
  }): Promise<AttendanceRecord> {
    if (!data.childId || !data.schoolId || data.consecutiveAbsences === undefined) {
      throw new AppError('childId, schoolId, and consecutiveAbsences are required.', 400);
    }

    if (data.consecutiveAbsences < 0) {
      throw new AppError('consecutiveAbsences cannot be negative.', 400);
    }

    const lastAttendDate = data.lastAttendDate ? new Date(data.lastAttendDate) : new Date();
    if (isNaN(lastAttendDate.getTime())) {
      throw new AppError('Invalid lastAttendDate provided.', 400);
    }

    const riskFlagged = this.evaluateDropoutRisk(data.consecutiveAbsences);

    return this.attendanceRepo.create({
      childId: data.childId,
      schoolId: data.schoolId,
      consecutiveAbsences: data.consecutiveAbsences,
      riskFlagged,
      lastAttendDate,
    });
  }

  async getAttendanceRecords(filter?: AttendanceFilterDTO): Promise<AttendanceRecord[]> {
    return this.attendanceRepo.findAll(filter);
  }

  async getFlaggedDropoutRisks(schoolId?: string): Promise<AttendanceRecord[]> {
    return this.attendanceRepo.findAll({ schoolId, riskFlagged: true });
  }

  async getAttendanceRecordById(id: string): Promise<AttendanceRecord> {
    const record = await this.attendanceRepo.findById(id);
    if (!record) {
      throw new AppError(`Attendance record with ID '${id}' not found.`, 404);
    }
    return record;
  }

  async updateAbsences(
    id: string,
    consecutiveAbsences: number,
    lastAttendDate?: string | Date
  ): Promise<AttendanceRecord> {
    if (consecutiveAbsences < 0) {
      throw new AppError('consecutiveAbsences cannot be negative.', 400);
    }

    await this.getAttendanceRecordById(id);

    const parsedDate = lastAttendDate ? new Date(lastAttendDate) : undefined;
    if (parsedDate && isNaN(parsedDate.getTime())) {
      throw new AppError('Invalid lastAttendDate provided.', 400);
    }

    const riskFlagged = this.evaluateDropoutRisk(consecutiveAbsences);
    return this.attendanceRepo.updateAbsences(id, consecutiveAbsences, riskFlagged, parsedDate);
  }
}
