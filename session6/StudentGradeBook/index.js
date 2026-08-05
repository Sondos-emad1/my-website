import { addStudent } from "./modules/addStudent.js";
import { listStudents } from "./modules/listStudents.js";
import { filterPassed } from "./modules/filterPassed.js";

addStudent("Ali", [80, 90, 70]);
addStudent("Sara", [50, 60, 55]);
addStudent("Omar", [100, 90, 95]);

console.log();

listStudents();

console.log();

filterPassed();