const Sequelize = require("sequelize");

const Transaction = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "transactions",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      total_payment: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Total Payment Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Total Payment Can't be Empty!",
          },
        },
      },
      invoice: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Invoice Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Invoice Can't be Empty!",
          },
        },
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      purchased: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Purchased Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Purchased Can't be Empty!",
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

module.exports = Transaction;
