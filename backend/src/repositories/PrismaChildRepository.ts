import { Child } from '@prisma/client';
import { prisma } from '../db/prisma';
import { IChildRepository, CreateChildDTO, ChildFilterDTO } from './IChildRepository';

export class PrismaChildRepository implements IChildRepository {
  async create(data: CreateChildDTO): Promise<Child> {
    return prisma.child.create({
      data: {
        fullName: data.fullName,
        ageYears: data.ageYears,
        gender: data.gender,
        guardianName: data.guardianName,
        guardianPhone: data.guardianPhone,
        villageOrCity: data.villageOrCity,
        district: data.district,
        state: data.state,
        schoolOrCenterId: data.schoolOrCenterId,
      },
    });
  }

  async findAll(filter?: ChildFilterDTO): Promise<Child[]> {
    return prisma.child.findMany({
      where: {
        ...(filter?.district && { district: filter.district }),
        ...(filter?.villageOrCity && { villageOrCity: filter.villageOrCity }),
        ...(filter?.schoolOrCenterId && { schoolOrCenterId: filter.schoolOrCenterId }),
      },
      include: {
        incidents: true,
        nutritionRecords: true,
        attendanceLogs: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Child | null> {
    return prisma.child.findUnique({
      where: { id },
      include: {
        incidents: true,
        nutritionRecords: true,
        attendanceLogs: true,
      },
    });
  }
}
