const { Gym } = require("../db/models");
const { Type } = require("../db/models");
const { Class } = require("../db/models");

exports.fetchType = async (typeId, next) => {
  try {
    const foundType = await Type.findByPk(typeId);
    if (foundType) return foundType;
    else next({ message: "Type does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.typeList = async (req, res, next) => {
  try {
    const types = await Type.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: { model: Gym, as: "gym", attributes: ["name"] },
    });
    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

exports.typeDetail = async (req, res, next) => {
  res.status(200).json(req.type);
};

exports.classCreate = async (req, res, next) => {
  try {
    const foundgym = await Gym.findOne({
      where: {
        id: req.type.gymId,
      },
    });
    if (req.user.isAdmin) {
      if (req.user.id === foundgym.userId) {
        req.body.typeId = req.type.id;
        if (req.file) {
          req.body.image = `http://${req.get("host")}/media/${
            req.file.filename
          }`;
        }
        const newClass = await Class.create(req.body);
        res.status(201).json(newClass);
      } else {
        next({
          status: 401,
          message: "You can't add in another user's shop !!",
        });
      }
    } else {
      next({
        status: 401,
        message: "You don't have access to add new CLASSES !!",
      });
    }
  } catch (error) {
    next(error);
  }
};
