import { empty, is_empty, push, top, pop, Stack } from '../lib/stack';
import { head, tail, is_null, List } from '../lib/list';

/**
 * Checks whether a sequence of parentheses is balanced, i.e. if opening
 * parentheses are closed with a correct nesting between different types of
 * parentheses.
 * @precondition Assumes that the input contains only the following
 *               characters: [,],{,},(,).
 * @example
 * // returns true
 * is_balanced(list("[", "{", "(", ")", "[", "]", "}", "]"));
 * // returns false
 * is_balanced(list("[", "{", "}", ")", "]"));
 * @param str input sequence of parentheses
 * @returns Returns true if the input sequence is balanced, false otherwise.
 */
export function is_balanced(str: List<string>) {
    return balanced_helper(str, empty<string>());
}

function balanced_helper(str: List<string>, stck: Stack<string>): boolean {
    // reached end of the string, there should not be any dangling parentheses
    if (is_null(str)) {
        return is_empty<string>(stck);

    // we have an opening parenthesis, push the closing one on the stack
    } else if (lparen(head(str))) {
        return balanced_helper(tail(str), push<string>(op(head(str)), stck));

    // we have a closing parenthesis, and it matches the top of the stack
    } else if (rparen(head(str)) &&
               !is_empty(stck) &&
               top(stck) === head(stck)) {
         return balanced_helper(tail(str), pop<string>(stck));
    } else {
        return false;
    }
}

// checks whether a string is a left parenthesis
function lparen(s: string): boolean {
    return s === "(" || s === "{" || s === "[";
}

// checks whether a string is a right parenthesis
function rparen(s: string): boolean {
    return s === ")" || s === "}" || s === "]";
}

// returns the matching closing parenthesis, returns input unchanged otherwise
function op(s: string): string {
    return s === "("
               ? ")"
           : s === "{"
               ? "}"
           : s === "["
               ? "]"
           : s
}