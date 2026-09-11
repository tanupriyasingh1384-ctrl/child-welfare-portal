import { Router } from 'express';
import { PrismaNutritionRepository } from '../repositories/PrismaNutritionRepository';
import { NutritionService } from '../services/NutritionService';
import { NutritionController } from '../controllers/NutritionController';

const router = Router();

const nutritionRepo = new PrismaNutritionRepository();
const nutritionService = new NutritionService(nutritionRepo);
const nutritionController = new NutritionController(nutritionService);

router.post('/', nutritionController.create);
router.get('/', nutritionController.getAll);
router.get('/:id', nutritionController.getById);

export default router;
