import express from 'express';
import { register, login } from '../controllers/user.controller.js';
import { get } from 'mongoose';
import isAuthenticated from '../middleware/isAuthenticated.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(isAuthenticated, getUserProfile);
router.route('/logout').get(isAuthenticated, logout);
router.route('/profile/update').put(isAuthenticated, upload.single("profilePhoto"), updateUser);

export default router;