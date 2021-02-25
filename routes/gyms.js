const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");

const {
  gymCreate,
  gymList,
  fetchGym,
  typeCreate,
} = require("../controllers/gymController");

const router = express.Router();

router.param("gymId", async (req, res, next, gymId) => {
  const foundGym = await fetchGym(gymId, next);
  if (foundGym) {
    req.gym = foundGym;
    next();
  } else {
    next({
      status: 404,
      message: "Gym not found",
    });
  }
});

//gym list
router.get("/", gymList);

//create gym
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  gymCreate
);

//create type
router.post(
  "/:gymId/types",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  typeCreate
);

module.exports = router;
