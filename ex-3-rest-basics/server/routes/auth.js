const { Router } = require('express');

const authControllers = require('../controllers/auth');
const authValidators = require('../validators/auth');
const { validationErrors } = require('../middlewares');

const router = Router();

router.post(
	'/signup',
	[authValidators.user, validationErrors],
	authControllers.createUser
);

module.exports = router;
