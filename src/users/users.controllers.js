const RepairsServices = require("../repairs/repairs.services");
const UsersServices = require("./users.services");

const findAll = async (req, res) => {
  try {
    const AllUsers = await UsersServices.findAll();

    return res.status(201).json({
      data: AllUsers,
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

    const User = await UsersServices.findOne(id);

    if (!User) {
      return res.status(404).json({
        status: "error",
        message: `User not found`,
      });
    }

    return res.status(201).json({
      data: User,
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
    const { name, email, password, role, status } = req.body;

    //Verificar que si existe por medio de su EMAIL

    const existingUser = await UsersServices.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        error: "Conflict",
        message: `The email address ${email} already exists in the database.`,
      });
    }

    const userCreate = await UsersServices.create({
      name,
      email,
      password,
      role,
      status,
    });

    return res.status(201).json({
      data: userCreate,
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
    const { name, email } = req.body;

    const User = await UsersServices.findOne(id);

    if (!User) {
      return res.status(404).json({
        status: "error",
        message: `User not found`,
      });
    }

    const UserUpdated = await UsersServices.update(User, {
      name,
      email,
    });

    return res.status(201).json({
      UserUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      error,
    });
  }
};

const inactive = async (req, res) => {
  try {
    const { id } = req.params;

    const User = await UsersServices.findOne(id);

    if (!User) {
      return res.status(404).json({
        status: "error",
        message: `User not found`,
      });
    }

    await UsersServices.delete(User);

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
  inactive,
};
