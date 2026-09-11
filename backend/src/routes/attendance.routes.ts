import { Router } from 'express';
import { PrismaAttendanceRepository } from '../repositories/PrismaAttendanceRepository';
import { AttendanceService } from '../services/AttendanceService';
import { AttendanceController } from '../controllers/AttendanceController';

const router = Router();

const attendanceRepo = new PrismaAttendanceRepository();
const attendanceService = new AttendanceService(attendanceRepo);
const attendanceController = new AttendanceController(attendanceService);

router.post('/', attendanceController.create);
router.get('/', attendanceController.getAll);
router.get('/flagged', attendanceController.getFlagged);
router.get('/:id', attendanceController.getById);
router.patch('/:id/absences', attendanceController.updateAbsences);

export default router;
