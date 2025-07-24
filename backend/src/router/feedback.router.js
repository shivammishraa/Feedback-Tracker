const express = require("express");
const router = express.Router();
const { saveFile, readFile } = require("../utils/file.saver");
const authorize = require("../middleware/authmiddleware");
const constant = require("../constants/feedback.constant");
const { v4: uuidv4 } = require("uuid");

router.get("", authorize, (req, res) => {
  readFile(constant.FEEDBACK_FILE_NAME)
    .then((data) => {
      res.status(200).send({
        message: "Feedback fetched",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        err: err.message,
      });
    });
});

router.post("", authorize, (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Invalid Data");
    }
    console.log("res", req.user);
    readFile(constant.FEEDBACK_FILE_NAME)
      .then((data) => {
        const fetchedData = [...data];
        const dataToBeSaved = { ...req.body };
        dataToBeSaved.userId = req.user.userId;
        dataToBeSaved.likedByUsers = [];
        dataToBeSaved.dislikedByUsers = [];
        dataToBeSaved.uuid = uuidv4();
        fetchedData.push(dataToBeSaved);
        saveFile(constant.FEEDBACK_FILE_NAME, JSON.stringify(fetchedData));
        res.status(201).send({
          message: "Feedback saved successfully",
          data: fetchedData,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

router.delete("/:id", authorize, (req, res) => {
  try {
    if (!req.params?.id) {
      throw new Error("Feedback can't be deleted");
    }
    console.log("res", req.user);
    readFile(constant.FEEDBACK_FILE_NAME)
      .then((data) => {
        const fetchedData = [...data];
        const dataToBeDeleted = fetchedData.findIndex(
          (item) =>
            item.uuid === req.params?.id && item?.userId === req?.user?.userId
        );
        if (dataToBeDeleted < 0) {
          throw new Error(
            "Feedback you are trying to delete migth not exisit or don't belong to you"
          );
        }
        fetchedData.splice(dataToBeDeleted, 1);
        saveFile(constant.FEEDBACK_FILE_NAME, JSON.stringify(fetchedData));
        res.status(200).send({
          message: "Feedback saved successfully",
          data: fetchedData,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

router.put("/:id", authorize, (req, res) => {
  try {
    if (!req.params?.id) {
      throw new Error("Invalid Data");
    }
    if (!req.body) {
      throw new Error("Invalid Data");
    }
    readFile(constant.FEEDBACK_FILE_NAME)
      .then((data) => {
        const fetchedData = [...data];
        const indexNeedToBeUpdated = fetchedData.findIndex(
          (item) =>
            item.uuid === req.params?.id
        );
        if (indexNeedToBeUpdated < 0) {
          throw new Error(
            "Feedback you are trying to delete migth not exisit or don't belong to you"
          );
        }
        /* check if user is part of like or dislike list if user remove them */
        fetchedData[indexNeedToBeUpdated].likedByUsers = fetchedData[
          indexNeedToBeUpdated
        ].likedByUsers.filter((item) => item != req.user?.userId);
        fetchedData[indexNeedToBeUpdated].dislikedByUsers = fetchedData[
          indexNeedToBeUpdated
        ].dislikedByUsers.filter((item) => item != req.user?.userId);

        /* logic to add userID in the liked or dislike */
        if (req.body.vote === 1) {
          fetchedData[indexNeedToBeUpdated].likedByUsers = [
            ...fetchedData[indexNeedToBeUpdated].likedByUsers,
            req?.user?.userId,
          ];
        } else {
          fetchedData[indexNeedToBeUpdated].dislikedByUsers = [
            ...fetchedData[indexNeedToBeUpdated].dislikedByUsers,
            req?.user?.userId,
          ];
        }
        saveFile(constant.FEEDBACK_FILE_NAME, JSON.stringify(fetchedData));
        res.status(200).send({
          message: "Feedback Status Updated",
          data: fetchedData,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = router;
