const express = require("express");
const router = express.Router();
const { saveFile, readFile } = require("../utils/file.saver");
const { createToken } = require("../utils/jwt.utils");
const FEEDBACK_CONSTANT = require("../constants/feedback.constant");
const byscrptjs = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

router.post("/sign-up", (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Invalid Data");
    }
    const userData = { ...req.body };
    if (
      !userData.password ||
      !userData.email ||
      !userData.firstName ||
      !userData.lastName
    ) {
      throw new Error("Invalid Data, Please provide all required data");
    }
    readFile(FEEDBACK_CONSTANT.USER_FILE_NAME)
      .then((data) => {
        const savedData = [...data];
        const salt = byscrptjs.genSaltSync(FEEDBACK_CONSTANT.HASH_SAULT_ROUND);
        const hashedPassword = byscrptjs.hashSync(userData.password, salt);
        userData.password = hashedPassword;
        const isEmailReadyExisit = savedData.findIndex(
          (user) => user.email === userData.email
        );
        if (isEmailReadyExisit >= 0) {
          throw new Error(
            "User with same email already exist,please choose different email address"
          );
        }
        userData.uuid = uuidv4();
        savedData.push(userData);
        saveFile(FEEDBACK_CONSTANT.USER_FILE_NAME, JSON.stringify(savedData));
        res.status(201).send({
          message: "User Created Successfully",
          data: null,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/login", (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Invalid data");
    }
    const payload = { ...req.body };
    if (!payload.password || !payload.email) {
      throw new Error("Invalid Data, Please provide all required data");
    }
    readFile(FEEDBACK_CONSTANT.USER_FILE_NAME)
      .then((data) => {
        const savedData = [...data];
        const loggedInUser = savedData.filter(
          (user) => user.email === payload.email
        )[0];
        if (!loggedInUser) {
          throw new Error("User with email does not exist, please try again");
        }
        const comparedPassword = byscrptjs.compareSync(
          payload.password,
          loggedInUser.password
        );
        if (!comparedPassword) {
          throw new Error("Incorrect Password, please try again");
        }
        loggedInUser.token = createToken(loggedInUser)
          saveFile(FEEDBACK_CONSTANT.USER_FILE_NAME, JSON.stringify(savedData));
        res.status(201).send({
          message: "Logged In Successfully",
          data: loggedInUser,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
