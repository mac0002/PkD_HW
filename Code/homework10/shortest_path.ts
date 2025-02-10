import {
    List, list as lst, Pair, pair, for_each, filter, is_null, head, tail,
    append, flatten
} from '../lib/list';

import {
    type Queue, empty as empty_q, is_empty, enqueue, dequeue, head as qhead
} from '../lib/queue_array';
import {
    ListGraph, lg_new
} from "../lib/graphs";

// Build an array based on a function computing the item at each index
function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}

/**
 * Node colours for traversal algorithms
 * @constant white an unvisited node
 * @constant grey a visited but not finished node
 * @constant black a finished node
 */
const white = 1;
const grey = 2;
const black = 3;

/**
 * Computes a shortest path between two nodes in a ListGraph.
 * Returns one of possibly several paths.
 * @param lg the list graph
 * @param initial the id of the starting node
 * @param end the id of the end node
 * @returns A list with the nodes on one shortest path from initial to end,
 *          with initial and end included. If no such path exists, returns
 *          the empty list.
 */
export function lg_shortest_path({adj, size}: ListGraph,
                                 initial: number, end: number): List<number> {

    // YOUR TASK: modify the original BFS code below.
    // Do NOT modify the function signature.

    const result  = empty_q<number>();  // nodes in the order they are being visited
    const pending = empty_q<number>();  // grey nodes to be processed
    const colour  = build_array(size, _ => white);
    const prev = build_array(size, _ => -1);

    // console.log("prev: ", prev) 

    // visit a white node
    function bfs_visit(current: number, parent: number | undefined): void {
        colour[current] = grey;
        enqueue(current, result);
        enqueue(current, pending);
        if (parent !== undefined) {
            prev[current] = parent
        }
    }

    // paint initial node grey (all others are initialized to white)
    bfs_visit(initial, undefined);

    while (!is_empty(pending)) {
        // dequeue the head node of the grey queue
        const current = qhead(pending);
        dequeue(pending);

        // Paint all white nodes adjacent to current node grey and enqueue them.
        const adjacent_white_nodes = filter(node => colour[node] === white,
                                            adj[current]);
        let adj_whites = adjacent_white_nodes;
        // for_each(bfs_visit, adjacent_white_nodes);
        while (!is_null(adj_whites)) {
            bfs_visit(head(adj_whites), current)
            adj_whites = tail(adj_whites)
        }
        // if (!is_null(adjacent_white_nodes)) {
        //     for (let unvisited of adjacent_white_nodes) {
        //         bfs_visit(unvisited)
        //         prev[unvisited] = current
        //     }
        // }

        // paint current node black; the node is now done.
        colour[current] = black;
        if (current === end) {
            break;
        }
    }
    console.log("prev: ", prev) 
    function backtracking(s: number, e: number, tracks: Array<number>): List<number> {
        if (s === e) {
           return lst()
        }
        let path: List<number> = null;
        for (let location = e; location != -1; location = prev[location]) {
            path = pair(location + 1, path);
        }
        console.log(path);
        if (!is_null(path)) {
            if (head(path!) === s + 1) {
                return path
            }
        } 
        return lst()
    }

    // Convert result from queue to List<number>
    // const result_queue = result; 
    // let result_list: List<number> = null;
    // while (!is_empty(result_queue)) {
    //     result_list = append(result_list, lst(qhead(result_queue) + 1));
    //     dequeue(result_queue);
    // }
    return backtracking(initial, end, prev);
}

// Testing ground
const ex_graph_task1: ListGraph = lg_new(6);
ex_graph_task1.adj = [lst(1, 2), // Node name/value 1, id 0
                      lst(3, 5), // ... 
                      lst(3, 4),
                      lst(4),
                      lst(5),    // ...
                      lst()];    // Node name/value 6, id 5

console.log(lg_shortest_path(ex_graph_task1, 3, 3));

const test_graph: ListGraph = {
    size: 10,
    adj: [lst(1),
           lst(2),
           lst(3),
           lst(4),
           lst(5),
           lst(6),
           lst(7),
           lst(8),
           lst(9),
           lst()]
}
// console.log(lg_shortest_path(test_graph, 0, 5))
// --------------------------------------------------
// NOT USED
// export function test({adj, size}: ListGraph,
//                      initial: number, end: number): List<number> {

//     const result = empty<number>();
//     const pending = empty<number>();
//     const colour  = build_array(size, _ => white);

//     function bfs_visit(current: number): void {
//         colour[current] = grey;
//         enqueue(current, result);
//         enqueue(current, pending);
//     } 

//     bfs_visit(initial)
//     while (!is_empty(pending)) {
//         const current = qhead(pending);

//         const adj_whites = filter(node => colour[node] === white, 
//                                   adj[current]);
//         for_each(bfs_visit, adj_whites);
//         dequeue(pending);
//         colour[current] = black;
//     }

    
//     // Convert result from queue to List<number>
//     const result_queue = result; 
//     var result_list: List<number> = null;
//     while (!is_empty(result_queue)) {
//         result_list = pair(qhead(result_queue) + 1, result_list)
//         dequeue(result_queue)
//     }
//     return result_list; 
// }
// --------------------------------------------------
