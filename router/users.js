const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidator, getUserValidator } = require('../errors/celebrate-validator');

router.get('/me', getUserValidator, getUser);
router.put('/me', updateUserValidator, updateUser);

module.exports = router;
