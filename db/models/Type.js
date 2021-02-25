module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define("Type", {
    type: { type: DataTypes.STRING, allowNull: false },
  });

  return Type;
};
