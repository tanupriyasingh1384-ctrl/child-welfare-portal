import { Router } from 'express';
import childRoutes from './child.routes';
import incidentRoutes from './incident.routes';
import nutritionRoutes from './nutrition.routes';
import attendanceRoutes from './attendance.routes';

const router = Router();

router.use('/children', childRoutes);
router.use('/incidents', incidentRoutes);
router.use('/nutrition', nutritionRoutes);
router.use('/attendance', attendanceRoutes);

export default router;
