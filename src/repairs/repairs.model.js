const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database/database");
const Users = require("../users/users.model");

const Repairs = sequelize.define("repairs", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("completed", "pending", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
});

Repairs.belongsTo(Users, { foreignKey: "userId" });
Users.hasMany(Repairs, { foreignKey: "userId" });

module.exports = Repairs;
