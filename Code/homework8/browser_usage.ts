import {
    BrowserHistory, current_page, visit_page, go_back, go_forward,
    new_browser_history
} from './browser';

// Example Usage:
const browser_history = new_browser_history();

const history1 = visit_page(visit_page(visit_page(browser_history, "Home"),
                                       "About"),
                            "Contact");

console.log("should print 'Contact': " + current_page(history1));

const history2 = go_back(history1);
console.log("should print 'About': " + current_page(history2));

const history3 = go_forward(history2);
console.log("should print 'Contact': " + current_page(history3));

const history4 = visit_page(history3, "News");
console.log("should print 'News': " + current_page(history4));

const history5 = go_forward(history4);
console.log("should print 'News': " + current_page(history5));


// Another example:
const __browser_history = new_browser_history();
const __history1 = visit_page(visit_page(visit_page(__browser_history, "Archive"), "Main"), "News");
console.log("should print 'News':" + current_page(__history1));

const __history2 = go_forward(__history1);
console.log("should print 'News':" + current_page(__history2));

const __history3 = go_back(__history2);
console.log("should print 'Main':" + current_page(__history3));

const __history4 = go_back(__history3);
console.log("should print 'Archive':" + current_page(__history4));

const __history5 = visit_page(__history4, "Recent");
console.log("should print 'Recent':" + current_page(__history5));
