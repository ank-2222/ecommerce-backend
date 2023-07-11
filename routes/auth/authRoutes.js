const express = require("express");

const loginController = require("../../controller/auth/loginController")
const registerController = require("../../controller/auth/registerController")
const router = express.Router();


router.post('/api/auth/login',loginController.login);
router.post('/api/auth/register',registerController.register);

module.exports = router;