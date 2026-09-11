import { AttendanceRecord } from '@prisma/client';

export interface CreateAttendanceRecordDTO {
  childId: string;
  schoolId: string;
  consecutiveAbsences: number;
  riskFlagged: boolean;
  lastAttendDate: Date;
}

export interface AttendanceFilterDTO {
  schoolId?: string;
  childId?: string;
  riskFlagged?: boolean;
}

export interface IAttendanceRepository {
  create(data: CreateAttendanceRecordDTO): Promise<AttendanceRecord>;
  findAll(filter?: AttendanceFilterDTO): Promise<AttendanceRecord[]>;
  findById(id: string): Promise<AttendanceRecord | null>;
  updateAbsences(
    id: string,
    consecutiveAbsences: number,
    riskFlagged: boolean,
    lastAttendDate?: Date
  ): Promise<AttendanceRecord>;
}
