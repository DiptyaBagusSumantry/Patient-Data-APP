const Sequelize = require("sequelize");

const Patient = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "patients",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      number_regristation: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: "number_regristation",
          msg: "Number Regristation Already Registered!",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Number Regristation Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Number Regristation Can't be Empty!",
          },
        },
      },
      fullname: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fullname Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Fullname Can't be Empty!",
          },
        },
      },
      key_version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Key Version Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Key Version Can't be Empty!",
          },
        },
      },
      place_birth: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Place Birth Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Place Birth Can't be Empty!",
          },
        },
      },
      date_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Date Birth Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Date Birth Can't be Empty!",
          },
        },
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Gender Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Gender Can't be Empty!",
          },
        },
      },
      address: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Address Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Address Can't be Empty!",
          },
        },
      },
      work: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "work Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "work Can't be Empty!",
          },
        },
      },
      mac: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "mac Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "mac Can't be Empty!",
          },
        },
      },
      iv: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "iv Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "iv Can't be Empty!",
          },
        },
      },
      phone: {
        type: Sequelize.STRING,
        unique: {
          args: "phone",
          msg: "Phone Already Registered!",
        },
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Phone Can't be Null",
          },
          notEmpty: {
            args: true,
            msg: "Phone Can't be Empty",
          },
          isNumeric: {
            args: true,
            msg: "Phone Must be Number",
          },
          len: {
            args: [10, 15],
            msg: "Phone Must be 10 - 15 Number!",
          },
        },
      },
    },
    {
      freezeTableName: true,
      // paranoid: true,
      underscored: true,
    }
  );
};

module.exports = Patient;
