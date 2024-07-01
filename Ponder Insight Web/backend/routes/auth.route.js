import express from 'express';
import { google, signin, signup, toggleAdmin, verifyOtp } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/signin', signin);
router.post('/google', google);
router.post('/toggle/:id', toggleAdmin);

export default router;