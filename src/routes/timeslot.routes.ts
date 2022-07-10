import express from 'express';
import controller from '../controllers/timeslot.controller';

const router = express.Router();

router.post('/create', controller.createTimeslot);
router.get('/get/:timeslotId', controller.readTimeslot);
router.get('/get', controller.readAll);
router.patch('/update/:timeslotId', controller.updateTimeslot);
router.delete('/delete/:timeslotId', controller.deleteTimeslot);

router.post('/add-couriers', controller.addCouriers);

export = router;
