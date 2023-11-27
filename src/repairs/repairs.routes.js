const express = require("express");
const {
  findAll,
  findOne,
  create,
  update,
  cancel,
} = require("./repairs.controllers");

const router = express.Router();

router.get("/repairs/", findAll);

router.get("/repairs/:id", findOne);

router.post("/repairs/", create);

router.patch("/repairs/:id", update);

router.delete("/repairs/:id", cancel);

module.exports = router;
