const express = require("express");
const passport = require("passport");
const {
  classList,
  classDetail,
  classDelete,
  classUpdate,
  fetchClass,
} = require("../controllers/classController");
const router = express.Router();

const upload = require("../middleware/multer");

router.param("classId", async (req, res, next, classId) => {
  const foundClass = await fetchClass(classId, next);
  if (foundClass) {
    req.class = foundClass;
    next();
  } else {
    next({
      status: 404,
      message: "Class not found",
    });
  }
});

// router.post("/", upload.single("image"), classCreate);

//list
router.get("/", passport.authenticate("jwt", { session: false }), classList);

//detail
router.get(
  "/:classId",
  passport.authenticate("jwt", { session: false }),
  classDetail
);

module.exports = router;
