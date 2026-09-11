import { NutritionLog } from '@prisma/client';
import { INutritionRepository, NutritionFilterDTO } from '../repositories/INutritionRepository';
import { AppError } from '../middleware/errorHandler';

export class NutritionService {
  constructor(private nutritionRepo: INutritionRepository) {}

  /**
   * Calculates nutrition status based on WHO child growth indicators / BMI heuristic:
   * BMI = weight_kg / (height_meters)^2
   * BMI < 13.5: SEVERE_ACUTE_MALNUTRITION
   * BMI < 15.5: MODERATE
   * Otherwise: NORMAL
   */
  public calculateNutritionStatus(weightKg: number, heightCm: number, manualStatus?: string): string {
    if (manualStatus) {
      return manualStatus;
    }

    const heightMeters = heightCm / 100;
    if (heightMeters <= 0) {
      throw new AppError('heightCm must be greater than 0', 400);
    }

    const bmi = weightKg / (heightMeters * heightMeters);

    if (bmi < 13.5) {
      return 'SEVERE_ACUTE_MALNUTRITION';
    } else if (bmi < 15.5) {
      return 'MODERATE';
    }
    return 'NORMAL';
  }

  async logNutrition(data: {
    childId: string;
    ageMonths: number;
    weightKg: number;
    heightCm: number;
    status?: string;
  }): Promise<NutritionLog> {
    if (!data.childId || data.ageMonths === undefined || data.weightKg === undefined || data.heightCm === undefined) {
      throw new AppError('childId, ageMonths, weightKg, and heightCm are required.', 400);
    }

    if (data.ageMonths < 0 || data.weightKg <= 0 || data.heightCm <= 0) {
      throw new AppError('Invalid dimensions: ageMonths must be >= 0, weightKg and heightCm must be > 0.', 400);
    }

    const calculatedStatus = this.calculateNutritionStatus(data.weightKg, data.heightCm, data.status);

    return this.nutritionRepo.create({
      childId: data.childId,
      ageMonths: data.ageMonths,
      weightKg: data.weightKg,
      heightCm: data.heightCm,
      status: calculatedStatus,
    });
  }

  async getNutritionLogs(filter?: NutritionFilterDTO): Promise<NutritionLog[]> {
    return this.nutritionRepo.findAll(filter);
  }

  async getNutritionLogById(id: string): Promise<NutritionLog> {
    const log = await this.nutritionRepo.findById(id);
    if (!log) {
      throw new AppError(`Nutrition log with ID '${id}' not found.`, 404);
    }
    return log;
  }
}
