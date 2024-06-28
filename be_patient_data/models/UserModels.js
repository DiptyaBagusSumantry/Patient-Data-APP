const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

const User = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "users",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: "username",
          msg: "Username Already Registered!",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Username Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Username Can't be Empty!",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Password Can't be Empty!",
          },
          validatePassword: function (password) {
            if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                password
              )
            ) {
              throw new Error(
                "The password must contain at least 8 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
              );
            }
          },
        },
      },
      fullname: {
        type: Sequelize.STRING,
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     args: true,
        //     msg: "Fullname Can't be Null!",
        //   },
        //   notEmpty: {
        //     args: true,
        //     msg: "Fullname Can't be Empty!",
        //   },
        // },
      },
      phone: {
        type: Sequelize.STRING,
        // unique: {
        //   args: "phone",
        //   msg: "Phone Already Registered!",
        // },
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     args: true,
        //     msg: "Phone Can't be Null",
        //   },
        //   notEmpty: {
        //     args: true,
        //     msg: "Phone Can't be Empty",
        //   },
        //   isNumeric: {
        //     args: true,
        //     msg: "Phone Must be Number",
        //   },
        //   len: {
        //     args: [10, 15],
        //     msg: "Phone Must be 10 - 15 Number!",
        //   },
        // },
      },
      email: {
        type: Sequelize.STRING,
        // allowNull: false,
        // unique: {
        //   args: "email",
        //   msg: "Email Already Registered!",
        // },
        // validate: {
        //   notEmpty: {
        //     args: true,
        //     msg: "Email Can't Be Empty!",
        //   },
        //   notNull: {
        //     args: true,
        //     msg: "Email Can't be Null!",
        //   },
        //   isEmail: {
        //     args: true,
        //     msg: "Invalid Email Address!",
        //   },
        // },
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "role can't be empty",
          },
          notNull: {
            args: true,
            msg: "role can't be null",
          },
        },
      },
      sessionToken: {
        type: Sequelize.TEXT('long'),
        default: null,
      },
      code: {
        type: Sequelize.CHAR,
        default: null,
      },
      expiredAt: {
        type: Sequelize.STRING,
        default: null,
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
      //don't show password
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      //do show password with visible password
      scopes: {
        visiblePassword: {
          attributes: {
            include: ["password"],
          },
        },
      },
      hooks: {
        beforeCreate: (admin, opt) => {
          const hashedPassword = hashPassword(admin.password);
          admin.password = hashedPassword;
        },
      },
    }
  );
};

module.exports = User;
