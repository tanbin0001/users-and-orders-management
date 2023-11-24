import express from 'express';
import { UserControllers } from './users.controller';

const router = express.Router();

router.post('/api/users', UserControllers.createUser);
router.get('/api/users', UserControllers.getAllUsers);
router.get('/api/users/:userId', UserControllers.getSingleUser);
router.put('/api/users/:userId', UserControllers.updateUserData);
router.get('/api/users/:userId/orders', UserControllers.getUserOrders);
router.get('/api/users/:userId/orders/total-price', UserControllers.calculateTotalPrice);
router.put('/api/users/:userId/orders', UserControllers.updateUserOrders);
router.delete('/api/users/:userId', UserControllers.deleteUser);


export const UserRoutes = router;