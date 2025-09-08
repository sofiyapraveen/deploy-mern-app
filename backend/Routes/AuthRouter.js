const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router(); // 👈 small 'r' use karo



// Login route
router.post('/login', loginValidation, login);
// Signup route
router.post('/signup', signupValidation, signup);

module.exports = router;
