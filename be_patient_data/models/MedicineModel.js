const Sequelize = require("sequelize");

const Medicine = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "Medicine",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name Payment Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Name Payment Can't be Empty!",
          },
        },
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Price Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Price Can't be Empty!",
          },
        },
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: "code",
          msg: "Code Already Registered!",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Code Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Code Can't be Empty!",
          },
        },
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
    }
  );
};

module.exports = Medicine;
