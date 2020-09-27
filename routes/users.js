const express = require('express');

const router = express.Router();
const {
  getUsers, getProfile, updateProfile, updateAvatarProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getProfile);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatarProfile);

module.exports = router;
