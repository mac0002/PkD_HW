"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lg_shortest_path = lg_shortest_path;
exports.test = test;
var list_1 = require("../lib/list");
var queue_array_1 = require("../lib/queue_array");
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
    // visit a white node
    function bfs_visit(current) {
        colour[current] = grey;
        (0, queue_array_1.enqueue)(current, result);
        (0, queue_array_1.enqueue)(current, pending);
    }
    // paint initial node grey (all others are initialized to white)
    bfs_visit(initial);
    while (!(0, queue_array_1.is_empty)(pending)) {
        // dequeue the head node of the grey queue
        var current = (0, queue_array_1.head)(pending);
        (0, queue_array_1.dequeue)(pending);
        // Paint all white nodes adjacent to current node grey and enqueue them.
        var adjacent_white_nodes = (0, list_1.filter)(function (node) { return colour[node] === white; }, adj[current]);
        (0, list_1.for_each)(bfs_visit, adjacent_white_nodes);
        // paint current node black; the node is now done.
        colour[current] = black;
    }
    // Convert result from queue to List<number>
    var result_queue = result;
    var result_list = null;
    while (!(0, queue_array_1.is_empty)(result_queue)) {
        result_list = (0, list_1.append)(result_list, (0, list_1.list)((0, queue_array_1.head)(result_queue) + 1));
        (0, queue_array_1.dequeue)(result_queue);
    }
    return result_list;
}
// --------------------------------------------------
// NOT USED
function test(_a, initial, end) {
    var adj = _a.adj, size = _a.size;
    var result = (0, queue_array_1.empty)();
    var pending = (0, queue_array_1.empty)();
    var colour = build_array(size, function (_) { return white; });
    function bfs_visit(current) {
        colour[current] = grey;
        (0, queue_array_1.enqueue)(current, result);
        (0, queue_array_1.enqueue)(current, pending);
    }
    bfs_visit(initial);
    while (!(0, queue_array_1.is_empty)(pending)) {
        var current = (0, queue_array_1.head)(pending);
        var adj_whites = (0, list_1.filter)(function (node) { return colour[node] === white; }, adj[current]);
        (0, list_1.for_each)(bfs_visit, adj_whites);
        (0, queue_array_1.dequeue)(pending);
        colour[current] = black;
    }
    // Convert result from queue to List<number>
    var result_queue = result;
    var result_list = null;
    while (!(0, queue_array_1.is_empty)(result_queue)) {
        result_list = (0, list_1.pair)((0, queue_array_1.head)(result_queue) + 1, result_list);
        (0, queue_array_1.dequeue)(result_queue);
    }
    return result_list;
}
// --------------------------------------------------
