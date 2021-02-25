const { Gym } = require("../db/models");
const { Type } = require("../db/models");

exports.fetchGym = async (gymId, next) => {
  try {
    const foundGym = await Gym.findByPk(gymId);
    if (foundGym) return foundGym;
    else next({ message: "Gym does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.gymList = async (req, res, next) => {
  try {
    const gyms = await Gym.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },

      include: { model: Type, as: "types", attributes: ["id"] },
    });
    res.status(200).json(gyms);
  } catch (error) {
    next(error);
  }
};

exports.gymCreate = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.userId = req.user.id;
      const newGym = await Gym.create(req.body);
      res.status(201).json(newGym);
    } else {
      next({
        status: 401,
        message: "You don't have access to add new GYMS !!",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.typeCreate = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      if (req.user.id === req.gym.userId) {
        req.body.gymId = req.gym.id;
        // if (req.file) {
        //   req.body.image = `http://${req.get("host")}/media/${
        //     req.file.filename
        //   }`;
        // }
        const newType = await Type.create(req.body);
        res.status(201).json(newType);
      } else {
        next({
          status: 401,
          message: "You can't add in another user's gym !!",
        });
      }
    } else {
      next({
        status: 401,
        message: "You don't have access to add new TYPES !!",
      });
    }
  } catch (error) {
    next(error);
  }
};
