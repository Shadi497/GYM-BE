const { Class } = require("../db/models");
const { Type } = require("../db/models");
const { Op } = require("sequelize");

exports.fetchClass = async (classId, next) => {
  try {
    const foundClass = await Class.findByPk(classId);
    if (foundClass) return foundClass;
    else next({ message: "Class does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.classList = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      const classs = await Class.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          name: req.body,
          [Op.not]: [
            {
              numOfSeats: {
                [Op.col]: "Class.bookedSeats",
              },
            },
          ],
        },
        include: { model: Type, as: "type", attributes: ["type"] },
      });

      classs
        ? res.json(classs)
        : next({
            status: 404,
            message: "No such class found with name provided!",
          });
    } else {
      const classs = await Class.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          [Op.not]: [
            {
              numOfSeats: {
                [Op.col]: "Class.bookedSeats",
              },
            },
          ],
        },
        include: { model: Type, as: "type", attributes: ["type"] },
      });
      res.status(200).json(classs);
    }
  } catch (error) {
    next(error);
  }
};

exports.classDetail = async (req, res, next) => {
  res.status(200).json(req.class);
};
