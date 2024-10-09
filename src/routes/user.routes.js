const express = require('express');
const userController = require('../controller/user.controller');
const multer = require("multer");
const upload = multer({});
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post("/login",  userController.loginUser);

router.get('/weather/:city', authMiddleware, userController.getWeatherDetails);
router.get('/github/:user/:repo', authMiddleware, userController.getGithubDetails);





module.exports = router;
