const express=require("express");
const index = require("../controllers/index");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {checkPreviousSearch} = require("../middleware");

router.route("/")
    .get(index.renderIndex)
    .post(index.createPotion);

router.get("/results",checkPreviousSearch,wrapAsync(index.showResults));

router.get("/test",checkPreviousSearch,wrapAsync(index.test))

module.exports = router;