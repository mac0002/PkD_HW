import { Queue, dequeue, enqueue, is_empty, head} from "../lib/queue_immutable"
import { List, remove, length, pair } from "../lib/list"

/**
 * A Student is represented by their personnummer.
 */
export type Student = number

/**
 * A Course is a 3-tuple where:
 * - The first entry is the list of students registered for the course
 * - The second entry is the waiting list
 * - The third entry is the capacity of the course
 * Invariant:
 * - the capacity is non-negative
 * - if the course is not full, the waiting list is empty
 * - the same student does not appear twice in the queue or the waiting list
 */
export type Course = [List<Student>, Queue<Student>, number]

/**
 * Registers a student for a course. If the course is full, adds the student to
 * the waiting list.
 * @precondition the student is not already registered or on the waiting list.
 * @param course the course to register the student for
 * @param student the student being registered
 * @returns a new course with the student registered
 *
 */
export function apply(course: Course, student: Student): Course {
    // fill in code here
}

/**
 * Withdraws a student from a course. If there are students on the waiting list,
 * enrolls the first student on the waiting list.
 * @precondition the student is registered for the course (hence not on the waiting list)
 * @param course the course to withdraw the student from
 * @param student the student being withdrawn
 * @returns a new course with the student withdrawn
 */
export function withdraw(course: Course, student: Student): Course {
    // fill in code here
}