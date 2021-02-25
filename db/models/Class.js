module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Name already exists",
        },
        //   validate: {
        //     sc() {
        //       if (this.name.includes("event")) {
        //         throw new Error("You can't add (event) in name");
        //       }
        //     },
        //   },
      },
      numOfSeats: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          isPositive(value) {
            if (value < 0) {
              throw new Error("Only positive values are allowed!");
            }
          },
        },
      },
      bookedSeats: {
        type: DataTypes.INTEGER,
        validate: {
          isGreater() {
            if (this.bookedSeats > this.numOfSeats) {
              throw new Error("Booked seats exceeded the limit.");
            }
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isAfter: {
            args: "2011-11-05",
            msg: "Can't add previous date",
          },
        },
        // validate: {
        //   bothOrNone() {
        //     if ((this.startDate === null) !== (this.endDate === null))
        //       throw new Error("Either both dates, or neither!");
        //   },
        // },
      },
      time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        //  notNull: true
      },
    },
    { timestamps: false }
  );

  return Class;
};
