import { students } from "../data/students.js";
import { calculateAverage } from "./calculateAverage.js";

export function listStudents() {
  students.forEach(student => {
    console.log(`${student.name} - Average: ${calculateAverage(student.grades)}`);
  });
}