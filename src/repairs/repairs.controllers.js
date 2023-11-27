const UsersServices = require("../users/users.services");
const RepairsServices = require("./repairs.services");

const findAll = async (req, res) => {
  try {
    const Allrepairs = await RepairsServices.findAll();

    return res.status(201).json({
      Allrepairs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      error,
    });
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await RepairsServices.findOne(id);

    if (!appointment) {
      return res.status(404).json({
        status: "error",
        message: `Appointment not found`,
      });
    }

    return res.status(201).json({
      appointment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      error,
    });
  }
};

const create = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const findOne = await UsersServices.findOne(userId);

    if (!findOne) {
      return res.status(404).json({
        status: "error",
        message: `User not found`,
      });
    }
    const CreateAppointment = await RepairsServices.create({ date, userId });

    return res.status(201).json({
      CreateAppointment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      error,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await RepairsServices.findOne(id);

    if (!appointment) {
      return res.status(404).json({
        status: "error",
        message: `User not found`,
      });
    }

    const RepairUpdated = await RepairsServices.update(appointment);

    return res.status(201).json({
      RepairUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      error,
    });
  }
};

const cancel = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await RepairsServices.isCompleted(id);
        
    if (!appointment) {
      return res.status(404).json({
        status: "error",
        message: `Repair not found `,
      });
    } 


    if (appointment.status === "completed") {
      return res.status(404).json({
        status: "error",
        message: `The repair has already been completed and cannot be canceled.`,
      });
    }

    await RepairsServices.cancel(appointment);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  cancel,
};
