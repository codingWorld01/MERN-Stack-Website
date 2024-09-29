const express = require('express');
const router = express.Router();
const {signupSchema, loginSchema} = require('../middlewares/registerationmiddleware');
const validation = require('../validators/registeration-validation');
const controller = require('../controllers/auth-controller');
const authValidation = require('../middlewares/authValidation');

router.route('/').get(controller.home);
router.route('/register').post(validation(signupSchema) ,controller.register);
router.route('/login').post(validation(loginSchema), controller.login);
router.route('/user').get(authValidation, controller.user);

module.exports = router;