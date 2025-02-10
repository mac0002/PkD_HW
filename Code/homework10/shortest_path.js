"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lg_shortest_path = lg_shortest_path;
var list_1 = require("../lib/list");
var queue_array_1 = require("../lib/queue_array");
var graphs_1 = require("../lib/graphs");
// Build an array based on a function computing the item at each index
function build_array(size, content) {
    var result = Array(size);
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
var white = 1;
var grey = 2;
var black = 3;
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
function lg_shortest_path(_a, initial, end) {
    // YOUR TASK: modify the original BFS code below.
    // Do NOT modify the function signature.
    var adj = _a.adj, size = _a.size;
    var result = (0, queue_array_1.empty)(); // nodes in the order they are being visited
    var pending = (0, queue_array_1.empty)(); // grey nodes to be processed
    var colour = build_array(size, function (_) { return white; });
    var prev = build_array(size, function (_) { return -1; });
    // console.log("prev: ", prev) 
    // visit a white node
    function bfs_visit(current, parent) {
        colour[current] = grey;
        (0, queue_array_1.enqueue)(current, result);
        (0, queue_array_1.enqueue)(current, pending);
        if (parent !== undefined) {
            prev[current] = parent;
        }
    }
    // paint initial node grey (all others are initialized to white)
    bfs_visit(initial, undefined);
    while (!(0, queue_array_1.is_empty)(pending)) {
        // dequeue the head node of the grey queue
        var current = (0, queue_array_1.head)(pending);
        (0, queue_array_1.dequeue)(pending);
        // Paint all white nodes adjacent to current node grey and enqueue them.
        var adjacent_white_nodes = (0, list_1.filter)(function (node) { return colour[node] === white; }, adj[current]);
        var adj_whites = adjacent_white_nodes;
        // for_each(bfs_visit, adjacent_white_nodes);
        while (!(0, list_1.is_null)(adj_whites)) {
            bfs_visit((0, list_1.head)(adj_whites), current);
            adj_whites = (0, list_1.tail)(adj_whites);
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
    console.log("prev: ", prev);
    function backtracking(s, e, tracks) {
        if (s === e) {
            return (0, list_1.list)();
        }
        var path = null;
        for (var location_1 = e; location_1 != -1; location_1 = prev[location_1]) {
            path = (0, list_1.pair)(location_1 + 1, path);
        }
        console.log(path);
        if (!(0, list_1.is_null)(path)) {
            if ((0, list_1.head)(path) === s + 1) {
                return path;
            }
        }
        return (0, list_1.list)();
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
var ex_graph_task1 = (0, graphs_1.lg_new)(6);
ex_graph_task1.adj = [(0, list_1.list)(1, 2), // Node name/value 1, id 0
    (0, list_1.list)(3, 5), // ... 
    (0, list_1.list)(3, 4),
    (0, list_1.list)(4),
    (0, list_1.list)(5), // ...
    (0, list_1.list)()]; // Node name/value 6, id 5
console.log(lg_shortest_path(ex_graph_task1, 3, 3));
var test_graph = {
    size: 10,
    adj: [(0, list_1.list)(1),
        (0, list_1.list)(2),
        (0, list_1.list)(3),
        (0, list_1.list)(4),
        (0, list_1.list)(5),
        (0, list_1.list)(6),
        (0, list_1.list)(7),
        (0, list_1.list)(8),
        (0, list_1.list)(9),
        (0, list_1.list)()]
};
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
