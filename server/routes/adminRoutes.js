const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const publicAdminMiddleware = require('../middleware/publicAdmin');

router.get('/stats', publicAdminMiddleware, adminController.getAdminStats);
router.get('/users', publicAdminMiddleware, adminController.getAllUsers);
router.delete('/users/:id', publicAdminMiddleware, adminController.deleteUser);

module.exports = router;
