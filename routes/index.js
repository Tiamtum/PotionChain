const express=require("express");
const index = require("../controllers/index");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {checkPreviousSearch,checkPreviousSearchOnTest} = require("../middleware");

router.route("/")
    .get(index.renderIndex)
    .post(index.fetchData);

router.get("/results",checkPreviousSearch,wrapAsync(index.showResults));

router.get("/test",checkPreviousSearchOnTest,wrapAsync(index.test))

module.exports = router;