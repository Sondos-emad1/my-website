import { students } from "../data/students.js";

export function addStudent(name, grades) {
  students.push({
    name,
    grades
  });

  console.log(name + " added.");
}