const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

function addGrade(name, subject, grade) {
    const grades = readGrades();

    const newGrade = {
        id: grades.length + 1,
        name: name,
        subject: subject,
        grade: grade
    };

    grades.push(newGrade);

    saveGrades(grades);

    console.log("Grade added successfully");
}

module.exports = addGrade;