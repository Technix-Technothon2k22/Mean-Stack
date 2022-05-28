var express = require("express");
const { joinclass } = require("../controllers/student");
var router = express.Router();

router.post('/joinclass',joinclass);


module.exports = router;
