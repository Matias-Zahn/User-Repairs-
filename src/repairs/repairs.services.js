const Repairs = require("./repairs.model");

class RepairsServices {
  static async findAll() {
    return await Repairs.findAll({
      where: {
        status: "pending",
      },
    });
  }

  static async findOne(idParam) {
    return await Repairs.findOne({
      where: {
        status: "pending",
        id: idParam,
      },
    });
  }

  static async create(data) {
    return await Repairs.create(data);
  }

  static async update(repair) {
    return await repair.update({
      status: "completed",
    });
  }

  static async cancel(repair) {
    return await repair.update({
      status: "cancelled",
    });
  }

  static async isCompleted(idRepair){
    return await Repairs.findOne({
        where: {
            id: idRepair
        }
    })
  }
}

module.exports = RepairsServices;
