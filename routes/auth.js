var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const {signup,signin,signout} = require("../controllers/auth");

// router.get("/signout", signout);


router.post(
  "/signup",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be more than of 3 characters"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 7 })
    .withMessage("password must be more than of 3 characters"),
  signup
);


router.post(
  "/signin",
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("password field is required"),
  signin
);


router.get("/signout", signout);    

module.exports = router;
