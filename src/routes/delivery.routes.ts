import express from 'express';
import controller from '../controllers/delivery.controller';

const router = express.Router();

router.post('/create', controller.createDelivery);
router.get('/get/:deliveryId', controller.readDelivery);
router.get('/get', controller.readAll);
router.patch('/update/:deliveryId', controller.updateDelivery);
router.delete('/delete/:deliveryId', controller.deleteDelivery);

router.post('/:deliveryId/complete', controller.completeDelivery);
router.get('/daily', controller.readDaily);
router.get('/weekly', controller.readWeekly);
export = router;
