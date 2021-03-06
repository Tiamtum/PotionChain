const express=require("express");
const index = require("../controllers/index");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {checkPreviousSearch} = require("../middleware");

router.get("/",index.renderIndex)
router.get("/changelog",index.renderChangelog)
router.get("/results",checkPreviousSearch,wrapAsync(index.showResults));

module.exports = router;