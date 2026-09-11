import { Router } from 'express';
import { PrismaChildRepository } from '../repositories/PrismaChildRepository';
import { ChildService } from '../services/ChildService';
import { ChildController } from '../controllers/ChildController';

const router = Router();

const childRepo = new PrismaChildRepository();
const childService = new ChildService(childRepo);
const childController = new ChildController(childService);

router.post('/', childController.create);
router.get('/', childController.getAll);
router.get('/:id', childController.getById);

export default router;
