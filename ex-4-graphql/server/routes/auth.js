const { Router } = require('express');

const authControllers = require('../controllers/auth');
const authValidators = require('../validators/auth');
const { authJwt, authLocal, validationErrors } = require('../middlewares');

const router = Router();

router.post(
	'/signup',
	[authValidators.user, validationErrors],
	authControllers.createUser
);
router.post('/login', [authLocal], authControllers.login);
router.get('/', [authJwt], authControllers.getUser);
router.patch(
	'/',
	[authJwt, authValidators.status, validationErrors],
	authControllers.updateUser
);

module.exports = router;
