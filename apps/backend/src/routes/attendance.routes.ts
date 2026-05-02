import { Router } from 'express';
import { getAdminQrCode, scanQrCode, getAttendanceHistory } from '../controllers/attendance.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.get('/qr', requireAuth, requireRole('admin'), getAdminQrCode);
router.post('/scan', requireAuth, requireRole('staff', 'manager'), scanQrCode);
router.get('/history', requireAuth, requireRole('admin'), getAttendanceHistory);

export default router;