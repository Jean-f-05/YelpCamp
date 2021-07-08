const express = require("express");
const router = express.Router({mergeParams:true});
const reviews = require("../controllers/reviews")

const Review = require("../models/reviews")
const Campground = require("../models/campground")
const {validateReview, isLoggedIn, isReviwAuthor} = require("../middleware")
const {reviewSchema} = require("../schemas")

const catchAsync = require("../utils/catchAsync")
const ExpressError = require("../utils/ExpressError")


router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview))

router.delete("/:reviewID", isLoggedIn, isReviwAuthor, catchAsync(reviews.deleteReview))

module.exports = router