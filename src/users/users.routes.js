const express = require("express");
const {
  findAll,
  findOne,
  create,
  update,
  inactive,
} = require("./users.controllers");

const router = express.Router();

router.get("/users/", findAll);

router.get("/users/:id", findOne);

router.post("/users/", create);

router.patch("/users/:id", update);

router.delete("/users/:id", inactive);

module.exports = router;
