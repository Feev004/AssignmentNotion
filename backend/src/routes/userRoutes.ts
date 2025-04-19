import { Router } from 'express';
import {
    getUsers, createUser, updateUser, deleteUser,
    updateByUser
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/byuser/:id', updateByUser);
router.delete('/:id', deleteUser);

export default router;
