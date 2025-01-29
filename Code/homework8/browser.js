"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.history_after = exports.previous_history = void 0;
exports.new_browser_history = new_browser_history;
exports.current_page = current_page;
exports.visit_page = visit_page;
exports.go_back = go_back;
exports.go_forward = go_forward;
var stack_1 = require("../lib/stack");
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Retrieves history/pages before current page (back)
var previous_history = function (history) { return history[0]; };
exports.previous_history = previous_history;
// Retrieves history/pages after current page (forward)
var history_after = function (history) { return history[2]; };
exports.history_after = history_after;
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**
 * Creates a fresh browser history.
 * @returns Creates an empty browser history.
 */
function new_browser_history() {
    return [null, "", null];
}
/**
 * The currently open page in a browser history.
 * @param history A browser history
 * @returns The URL of the currently open website in history.
 */
function current_page(history) {
    return history[1];
}
/**
 * Update a browser history when visiting the new page.
 * This clears the forward history of pages visited.
 * @precondition page is not empty
 * @param history browser history so far
 * @param page the URL of the next page to visit
 * @return An updated browser history with 'page' as the current page and
 *     no forward pages stored.
 */
function visit_page(history, page) {
    return history[1] === ""
        ? [history[0], page, history[2]]
        : [(0, stack_1.push)(history[1], history[0]), page, history[2]];
}
/**
 * Update a browser history when navigating one page back.
 * @param history browser history so far
 * @returns An updated browser history with the current page being the one
 *    visited immediately before the current page in 'history', or the input
 *    'history' unchanged if there is no page to go back to.
 */
function go_back(history) {
    if ((0, exports.previous_history)(history) === null) {
        return history;
        // } else if (is_null(pop(previous_history(history)!)) === true) {
        //     return history
    }
    else {
        return [(0, stack_1.pop)((0, exports.previous_history)(history)), (0, stack_1.top)((0, exports.previous_history)(history)), (0, stack_1.push)(history[1], history[2])];
    }
    // return history[0] === null 
    //        ? history 
    //        : is_null(pop(history[0]!)) === true 
    //            ? history
    //            : [pop(history[0]!), push(top(history[0]!), history[1])]
}
/**
 * Update a browser history when navigating one page forward.
 * @param history browser history so far
 * @return An updated browser history with the current page the one that was
 *     last navigated back from, or the input 'history' unchanged if there is no
 *     page to go forward to.
 */
function go_forward(history) {
    if ((0, exports.history_after)(history) === null) {
        return history;
        // } else if (is_null(pop(previous_history(history)!)) === true) {
        //     return history
    }
    else {
        return [(0, stack_1.push)(history[1], (0, exports.previous_history)(history)), (0, stack_1.top)((0, exports.history_after)(history)), (0, stack_1.pop)((0, exports.history_after)(history))];
    }
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Example Usage:
// const browser_history = new_browser_history();
// const history1 = visit_page(visit_page(visit_page(browser_history, "Home"),
//                                        "About"),
//                             "Contact");
// console.log("should print 'Contact': " + current_page(history1));
// const history2 = go_back(history1);
// console.log("should print 'About': " + current_page(history2));
// const history3 = go_forward(history2);
// console.log("should print 'Contact': " + current_page(history3));
// const history4 = visit_page(history3, "News");
// console.log("should print 'News': " + current_page(history4));
// const history5 = go_forward(history4);
// console.log("should print 'News': " + current_page(history5));
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
