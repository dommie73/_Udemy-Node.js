const { Router } = require('express');

const authControllers = require('../controllers/auth');
const authValidators = require('../validators/auth');
const { authLocal, validationErrors } = require('../middlewares');

const router = Router();

router.post(
	'/signup',
	[authValidators.user, validationErrors],
	authControllers.createUser
);
router.post('/login', [authLocal], authControllers.login);

module.exports = router;
