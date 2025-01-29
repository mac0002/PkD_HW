import { Stack, empty, is_empty, push, top, pop, display_stack} from '../lib/stack';
import { List, is_null, head, tail, append, list } from '../lib/list';

/**
 * Evaluates an arithmetic expression in postfix notation.
 * @precondition Assumes the input to only contain the operators "+", "*", "-".
 * @example
 * // returns 9
 * eval_postfix(list(2, 4, 3, "+", "*", 5, "-"))
 * @param e expression in postfix notation as a list
 * @returns Returns the result of evaluating the input expression, null if the input is
            not well-formed.
 */
function eval_postfix(exp: List<number | string>): number | null {
    return eval_postfix_helper(exp, empty<number>());
}

function eval_postfix_helper(exp: List<number|string>, stck: Stack<number>): number | null {
    if (is_null(exp)) {
        return !is_empty(stck) ? top(stck) : null;
    } else {
        const next: string | number = head(exp);
        if (typeof next === "number") {
            return eval_postfix_helper(tail(exp), push(next, stck));
        } else if (typeof next === "string" && !is_empty(stck)) {
            const op2: number = top(stck);
            const stck_left = pop(stck);
            if (!is_empty(stck_left)) {
                const result = compute_result(top(stck_left), op2, next)
                return eval_postfix_helper(tail(exp), push(result, pop(stck_left)));
            }
        }
        return null;
    }
}

function compute_result(op1: number, op2: number, operator: string): number {
    return operator === "+"
                ? op1 + op2
            : operator === "-"
                ? op1 - op2
            : op1 * op2;
}

console.log(eval_postfix(list<number|string>(2, 4, 3, "+", "*", 5, "-")));
