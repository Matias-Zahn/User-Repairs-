const Users = require("./users.model");

class UsersServices {
  static async findAll() {
    return await Users.findAll({
      where: {
        status: "available",
      },
    });
  }

  static async findOne(idParam) {
    return await Users.findOne({
      where: {
        status: "available",
        id: idParam,
      },
    });
  }

  static async findByEmail(email) {
    return await Users.findOne({
      where: {
        status: "available",
        email: email,
      },
    });
  }

  static async create(data) {
    return await Users.create(data);
  }

  static async update(user, data) {
    return await user.update(data);
  }

  static async delete(user) {
    return await user.update({
      status: "disabled",
    });
  }
}

module.exports = UsersServices;
