import { NutritionLog } from '@prisma/client';
import { prisma } from '../db/prisma';
import { INutritionRepository, CreateNutritionLogDTO, NutritionFilterDTO } from './INutritionRepository';

export class PrismaNutritionRepository implements INutritionRepository {
  async create(data: CreateNutritionLogDTO): Promise<NutritionLog> {
    return prisma.nutritionLog.create({
      data: {
        childId: data.childId,
        ageMonths: data.ageMonths,
        weightKg: data.weightKg,
        heightCm: data.heightCm,
        status: data.status,
      },
      include: {
        child: true,
      },
    });
  }

  async findAll(filter?: NutritionFilterDTO): Promise<NutritionLog[]> {
    return prisma.nutritionLog.findMany({
      where: {
        ...(filter?.childId && { childId: filter.childId }),
        ...(filter?.status && { status: filter.status }),
      },
      include: {
        child: true,
      },
      orderBy: {
        recordedAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<NutritionLog | null> {
    return prisma.nutritionLog.findUnique({
      where: { id },
      include: {
        child: true,
      },
    });
  }
}
