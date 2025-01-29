import { List, remove, list } from "../lib/list"
import { empty, enqueue } from '../lib/queue_immutable';
import { Student, Course, apply, withdraw } from './course';

const student1: Student = 1;
const student2: Student = 2;
const student3: Student = 3;

const pkd: Course = [null, empty(), 2];

console.log("Registering student1:");
console.log("Output:  ", apply(pkd, student1));
console.log("Excepted: [ [ 1, null ], null, 2 ]");
console.log();

const pkd_with_student1: Course = [list(student1), empty(), 2];

console.log("Registering student2:");
console.log("Output:  ", apply(pkd_with_student1, student2));
console.log("Excepted: [ [ 2, [ 1, null ] ], null, 2 ]");
console.log();

const pkd_with_student12: Course = [list(student2, student1), empty(), 2];

console.log("Registering student3:");
console.log("Output:  ", apply(pkd_with_student12, student3));
console.log("Excepted: [ [ 2, [ 1, null ] ], [ 3, null ], 2 ]");
console.log();

const pkd_with_student123: Course = [[student1, [student2, null]], enqueue(student3, empty()), 2];

console.log("Withdrawing student2:");
console.log("Output:  ", withdraw(pkd_with_student123, student2));
console.log("Excepted: [ [ 3, [ 1, null ] ], null, 2 ]");
console.log();

const pkd_without_student2: Course = [[student1, [student3, null]], empty(), 2];

console.log("Withdrawing student1:");
console.log("Output:  ", withdraw(pkd_without_student2, student1));
console.log("Excepted: [ [ 3, null ], null, 2 ]");
console.log();

const pkd_without_student12: Course = [[student3, null], empty(), 2];

console.log("Withdrawing student3:");
console.log("Output:  ", withdraw(pkd_without_student12, student3));
console.log("Excepted: [ null, null, 2 ]");
console.log();
