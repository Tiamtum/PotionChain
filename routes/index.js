const express=require("express");
const index = require("../controllers/index");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {isOnPage} = require("../middleware");

router.route("/")
    .get(index.renderIndex)
    .post(index.createPotion);

router.get("/results",wrapAsync(index.showResults));

module.exports = router;