const fs = require("fs");

function readGrades() {
    const data = fs.readFileSync("./data/grades.json", "utf8");

    return JSON.parse(data);
}

module.exports = readGrades;