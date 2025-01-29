// TODO: your imports here
// (only list, stack, queue_immutable, or queue_array from ../lib are allowed)
import {
    head, tail, is_null, list, pair, map, List, length
} from '../lib/list'
import {
    empty as empty_stack, is_empty as isempty_stack, NonEmptyStack, Stack, display_stack, pop, top, push
} from "../lib/stack"
import {
    empty as empty_qi, is_empty as isempty_qi, enqueue as enqueue_qi, head as head_qi, display_queue
}from  "../lib/queue_immutable"
import {
    empty as empty_qa, is_empty as isempty_qa, enqueue as enqueue_qa
} from "../lib/queue_array"

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ADDITIONAL, NOT TAKEN FROM ORIGINAL TEMPLATE
// Solution check:
// tsc --strict browser_usage.ts; node browser_usage.js
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
/**
 * A Browser page
 * Invariant: page must be defined as a string
 */
export type page = string
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/**
 * Stores the history of visited webpages in a browser for forwards and
 * backwards navigation.
 * The first stack represents previous history, the third stack
 * represents history after current page, and page represents current page. 
 */
export type BrowserHistory = [Stack<page>, page, Stack<page>]

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Retrieves history/pages before current page (back)
export const previous_history = (history: BrowserHistory) => history[0]

// Retrieves history/pages after current page (forward)
export const history_after = (history: BrowserHistory) => history[2]
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/**
 * Creates a fresh browser history.
 * @returns Creates an empty browser history.
 */
export function new_browser_history(): BrowserHistory {
    return [null, "", null];
}

/**
 * The currently open page in a browser history.
 * @param history A browser history
 * @returns The URL of the currently open website in history.
 */
export function current_page(history: BrowserHistory): string {
    return history[1]
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
export function visit_page(history: BrowserHistory, page: string): BrowserHistory {
    return history[1] === ""
           ? [history[0], page, history[2]]
           : [push(history[1], history[0]), page, history[2]]
}

/**
 * Update a browser history when navigating one page back.
 * @param history browser history so far
 * @returns An updated browser history with the current page being the one
 *    visited immediately before the current page in 'history', or the input
 *    'history' unchanged if there is no page to go back to.
 */
export function go_back(history: BrowserHistory): BrowserHistory {
    if (previous_history(history) === null) {
        return history
    // } else if (is_null(pop(previous_history(history)!)) === true) {
    //     return history
    } else {
        return [pop(previous_history(history)!), top(previous_history(history)!), push(history[1], history[2])]
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
export function go_forward(history: BrowserHistory): BrowserHistory {
    if (history_after(history) === null) {
        return history
    // } else if (is_null(pop(previous_history(history)!)) === true) {
    //     return history
    } else {
        return [push(history[1], previous_history(history)!), top(history_after(history)!), pop(history_after(history)!)]
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
