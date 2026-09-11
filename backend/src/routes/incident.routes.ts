import { Router } from 'express';
import { PrismaIncidentRepository } from '../repositories/PrismaIncidentRepository';
import { IncidentService } from '../services/IncidentService';
import { IncidentController } from '../controllers/IncidentController';

const router = Router();

const incidentRepo = new PrismaIncidentRepository();
const incidentService = new IncidentService(incidentRepo);
const incidentController = new IncidentController(incidentService);

router.post('/', incidentController.create);
router.get('/', incidentController.getAll);
router.get('/:id', incidentController.getById);
router.patch('/:id/status', incidentController.updateStatus);

export default router;
