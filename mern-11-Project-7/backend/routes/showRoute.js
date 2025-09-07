const showRouter = require("express").Router();

const ShowModel = require("../models/showModel");
const authMiddleware = require("../middlewares/authMiddleware")

// Add Show
showRouter.post("/add-show", authMiddleware, async (req, res) => {
  try {
    const newShow = new ShowModel(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "New show has been added!",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
});

//delete-show
showRouter.post("/delete-show", authMiddleware, async (req, res) => {
  try {
    await ShowModel.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "The show has been deleted!",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
});

// Update show
showRouter.put("/update-show",authMiddleware,  async (req, res) => {
  try {
    await ShowModel.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "The show has been updated!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

//get all shows by theatre
showRouter.post("/get-all-shows-by-theatre",authMiddleware,  async (req, res) => {
  try {
    const shows = await ShowModel.find({ theatre: req.body.theatreId }).populate(
      "movie"
    );
    res.send({
      success: true,
      message: "All shows fetched",
      data: shows,
    });
    // console.log(req.body, res.data, shows)
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Get all theatres by movie which has some shows
showRouter.post("/get-all-theatres-by-movie", authMiddleware, async (req, res) => {
  try {
    const { movie, date } = req.body;
    // First get all the shows of the selected date
    const shows = await ShowModel.find({ movie, date }).populate("theatre");

    // Filter out the unique theatres now
    let uniqueTheatres = [];

    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );
      // If the theatre for this show is not present in unique
      // theatres, ONLY then add it, otherwise, simply ignore this show
      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });
    res.send({
      success: true,
      message: "All theatres fetched!",
      data: uniqueTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

//get show by id
showRouter.post("/get-show-by-id", authMiddleware, async (req, res) => {
  try {
    const show = await ShowModel.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "Show fetched!",
      data: show,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = showRouter;