const express = require("express");
const passport = require("passport");
const {
  typeList,
  typeDetail,
  typeDelete,
  typeUpdate,
  fetchType,
  classCreate,
} = require("../controllers/typeController");
const router = express.Router();

const upload = require("../middleware/multer");

router.param("typeId", async (req, res, next, typeId) => {
  const foundType = await fetchType(typeId, next);
  if (foundType) {
    req.type = foundType;
    next();
  } else {
    next({
      status: 404,
      message: "Type not found",
    });
  }
});

// router.post("/", upload.single("image"), typeCreate);

//list
router.get("/", passport.authenticate("jwt", { session: false }), typeList);

//detail
router.get(
  "/:typeId",
  passport.authenticate("jwt", { session: false }),
  typeDetail
);

//create class
router.post(
  "/:typeId/classes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  classCreate
);

module.exports = router;
