import authRouter from '../modules/auth/auth.routes';
import express from 'express';

const router = express.Router();

// Define routes for user operations
router.use('/auth', authRouter);

// router.post('/users/createuser', createUser);
// router.post('users/getuserbyemail', getUserByEmail);

export default router;