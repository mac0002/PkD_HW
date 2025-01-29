"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("../lib/list");
/**
 * Creates a new book
 * @param title The title of the book to be added.
 * @param isbn The book's ISBN number
 * @returns Returns a book that is not checked out (by default).
 */
function make_book(title, isbn) {
    return [title, isbn, false];
}
// Retrieves the title of a book.
var get_title = function (book_item) { return book_item[0]; };
// Retrieves the ISBN of a book.
var get_isbn = function (book_item) { return book_item[1]; };
// Returns true if the given book is marked as checked out.
var is_checked_out = function (book_item) { return book_item[2]; };
// Returns a book with the same title and ISBN, but marked as checked out.
var check_out_book = function (book_item) { return [get_title(book_item), get_isbn(book_item), true]; };
// Returns a book with the same title and ISBN, but marked as checked in.
var check_in_book = function (book_item) { return [get_title(book_item), get_isbn(book_item), false]; };
// An empty Library.
var empty_library = (0, list_1.list)();
/**
 * Add a new book to the library.
 * @param book New book to be added.
 * @param library The library to add a book to.
 * @returns Returns a new library, with the new book added if it does not
 *     already exist (does not override an existing entry).
 */
function add_book(book, library) {
    var isbn_book = get_isbn(book);
    function insert(lib) {
        // variant: length(lib)
        return (0, list_1.is_null)(lib)
            ? (0, list_1.list)(book)
            : get_isbn((0, list_1.head)(lib)) < isbn_book
                ? (0, list_1.pair)((0, list_1.head)(lib), insert((0, list_1.tail)(lib)))
                : (0, list_1.pair)(book, lib);
    }
    return insert(library);
}
/**
 * Retrieves a book from the library.
 * @param library The library to search for a book.
 * @param isbn The ISBN number of the wanted book.
 * @returns The book that has the given ISBN number or null, if it
 *     does not exist.
 */
function find_book(library, isbn) {
    function get(lib) {
        // variant: length(lib)
        return (0, list_1.is_null)(lib)
            ? null
            : get_isbn((0, list_1.head)(lib)) === isbn
                ? (0, list_1.head)(lib)
                : get((0, list_1.tail)(lib));
    }
    return get(library);
}
/**
 * Check out a book from the library.
 * Returns the library unmodified if the book is already checked out.
 * @param library The library where to check out the book.
 * @param isbn The ISBN number of the book to check out.
 * @returns Returns a new library where the mentioned book is marked
 *     as checked out.
 */
function check_out(library, isbn) {
    return (0, list_1.map)(function (book) { return get_isbn(book) === isbn ? check_out_book(book) : book; }, library);
}
/**
 * Check in a book from the library.
 * Returns the library unmodified if the book is already checked in.
 * @param library The library where to check in the book.
 * @param isbn The ISBN number of the book to check in.
 * @returns Returns a new library where the mentioned book is marked
 *     as checked in.
 */
function check_in(library, isbn) {
    return (0, list_1.map)(function (book) { return get_isbn(book) === isbn ? check_in_book(book) : book; }, library);
}
// Tests:
var lotta1 = make_book("Lotta på Bråkmakargatan", 9789129689006);
var lotta2 = make_book("Lotta på Bråkmakargatan", 9789129743753);
var pippi = make_book("Pippi Långstrump", 9789129723632);
var library = add_book(pippi, add_book(lotta2, add_book(lotta1, empty_library)));
console.log("test length of library: ", (0, list_1.length)(library) === 3);
console.log("test find_book not found:", find_book(library, 378295045) === null);
var book = find_book(library, 9789129689006);
console.log("test find_book found:", get_title(book) ===
    "Lotta på Bråkmakargatan");
console.log("test is_checked_out:", is_checked_out(book) === false);
var book2 = find_book(check_out(library, 9789129723632), 9789129723632);
console.log("test check_out:", get_title(book2) === "Pippi Långstrump");
console.log("test is_checked_out:", is_checked_out(book2) === true);
var book3 = find_book(check_in(check_out(library, 9789129723632), 9789129723632), 9789129723632);
console.log("test is_checked_out:", is_checked_out(book3) === false);
