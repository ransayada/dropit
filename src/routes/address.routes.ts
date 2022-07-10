import express from 'express';
import controller from '../controllers/address.controller';

const router = express.Router();

router.post('/create', controller.createAddress);
router.get('/get/:addressId', controller.readAddress);
router.get('/get', controller.readAll);
router.patch('/update/:addressId', controller.updateAddress);
router.delete('/delete/:addressId', controller.deleteAddress);

router.post('/resolve-address', controller.resolveAddress);
router.post('/create-one', controller.createOneAddress);

export = router;
