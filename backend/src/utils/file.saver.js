const fs = require("fs");
const path = require("path");
const FEEDBACK_CONSTANT = require("../constants/feedback.constant");

function saveFile(fileName, fileContent) {
  const folderPath = path.join(__dirname, "..", "database");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  const filePath = path.join(folderPath, fileName);
  fs.writeFileSync(filePath, fileContent, "utf8");
}

function readFile(fileName) {
  const folderPath = path.join(__dirname, "..", "database");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  const filePath = path.join(folderPath, fileName);
  const filePromise = new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        const dataToBeSend = JSON.parse(data);
        resolve(dataToBeSend);
      }
      else{
        resolve([])
      }
    });
  });
  return filePromise;
}

module.exports = { saveFile, readFile };
