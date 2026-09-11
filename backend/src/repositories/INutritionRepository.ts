import { NutritionLog } from '@prisma/client';

export interface CreateNutritionLogDTO {
  childId: string;
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  status: string;
}

export interface NutritionFilterDTO {
  childId?: string;
  status?: string;
}

export interface INutritionRepository {
  create(data: CreateNutritionLogDTO): Promise<NutritionLog>;
  findAll(filter?: NutritionFilterDTO): Promise<NutritionLog[]>;
  findById(id: string): Promise<NutritionLog | null>;
}
