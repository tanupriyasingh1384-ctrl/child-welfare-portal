import { AttendanceRecord } from '@prisma/client';
import { prisma } from '../db/prisma';
import { IAttendanceRepository, CreateAttendanceRecordDTO, AttendanceFilterDTO } from './IAttendanceRepository';

export class PrismaAttendanceRepository implements IAttendanceRepository {
  async create(data: CreateAttendanceRecordDTO): Promise<AttendanceRecord> {
    return prisma.attendanceRecord.create({
      data: {
        childId: data.childId,
        schoolId: data.schoolId,
        consecutiveAbsences: data.consecutiveAbsences,
        riskFlagged: data.riskFlagged,
        lastAttendDate: data.lastAttendDate,
      },
      include: {
        child: true,
      },
    });
  }

  async findAll(filter?: AttendanceFilterDTO): Promise<AttendanceRecord[]> {
    return prisma.attendanceRecord.findMany({
      where: {
        ...(filter?.schoolId && { schoolId: filter.schoolId }),
        ...(filter?.childId && { childId: filter.childId }),
        ...(filter?.riskFlagged !== undefined && { riskFlagged: filter.riskFlagged }),
      },
      include: {
        child: true,
      },
      orderBy: {
        consecutiveAbsences: 'desc',
      },
    });
  }

  async findById(id: string): Promise<AttendanceRecord | null> {
    return prisma.attendanceRecord.findUnique({
      where: { id },
      include: {
        child: true,
      },
    });
  }

  async updateAbsences(
    id: string,
    consecutiveAbsences: number,
    riskFlagged: boolean,
    lastAttendDate?: Date
  ): Promise<AttendanceRecord> {
    return prisma.attendanceRecord.update({
      where: { id },
      data: {
        consecutiveAbsences,
        riskFlagged,
        ...(lastAttendDate && { lastAttendDate }),
      },
      include: {
        child: true,
      },
    });
  }
}
