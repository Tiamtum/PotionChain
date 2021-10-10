const express=require("express");
const index = require("../controllers/index");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {checkPreviousSearch} = require("../middleware");

router.route("/")
    .get(index.renderIndex)
    .post(index.fetchData);

router.get("/results",checkPreviousSearch,wrapAsync(index.showResults));



module.exports = router;