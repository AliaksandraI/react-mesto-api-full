const express = require('express');

const router = express.Router();
const {
  getUsers, getProfile, createProfile, updateProfile, updateAvatarProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getProfile);
router.post('/', createProfile);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatarProfile);

module.exports = router;
