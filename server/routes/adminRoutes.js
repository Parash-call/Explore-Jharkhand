const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/stats', authMiddleware, adminMiddleware, adminController.getAdminStats);
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, adminController.deleteUser);

module.exports = router;
