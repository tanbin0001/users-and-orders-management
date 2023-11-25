import express from 'express';
import { UserControllers } from './users.controller';

const router = express.Router();

router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUsers);
router.get('/users/:userId', UserControllers.getSingleUser);
router.put('/users/:userId', UserControllers.updateUserData);
router.get('/users/:userId/orders', UserControllers.getUserOrders);
router.get('/users/:userId/orders/total-price', UserControllers.calculateTotalPrice);
router.put('/users/:userId/orders', UserControllers.updateUserOrders);
router.delete('/users/:userId', UserControllers.deleteUser);


export const UserRoutes = router;