const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/login', 
  [
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
  ],
  authController.register
); 

router.post('/logout', authController.logout);
router.get('/check', authMiddleware, authController.checkAuth);

module.exports = router;
