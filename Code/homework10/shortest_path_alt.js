"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lg_shortest_path = lg_shortest_path;
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
    var adj = _a.adj, size = _a.size;
    // If initial and end are the same, return a list with just that node
    if (initial === end) {
        return (0, list_1.list)(initial);
    }
    // Initialize colors array for tracking visited nodes
    var colors = build_array(size, function () { return white; });
    // Initialize parent array to track the path
    var parent = build_array(size, function () { return -1; });
    // Create queue and enqueue initial node
    var queue = (0, queue_array_1.empty)();
    (0, queue_array_1.enqueue)(initial, queue);
    colors[initial] = grey;
    var _loop_1 = function () {
        var current_1 = (0, queue_array_1.head)(queue);
        (0, queue_array_1.dequeue)(queue);
        // Get adjacent nodes
        var neighbors = adj[current_1];
        // Process each neighbor
        (0, list_1.for_each)(function (neighbor) {
            if (colors[neighbor] === white) {
                colors[neighbor] = grey;
                parent[neighbor] = current_1;
                (0, queue_array_1.enqueue)(neighbor, queue);
                // If we found the end node, we can stop
                if (neighbor === end) {
                    // Clear the queue to end the while loop
                    while (!(0, queue_array_1.is_empty)(queue)) {
                        (0, queue_array_1.dequeue)(queue);
                    }
                }
            }
        }, neighbors);
        colors[current_1] = black;
    };
    // BFS traversal
    while (!(0, queue_array_1.is_empty)(queue)) {
        _loop_1();
    }
    // If end node was not reached (parent[end] is still -1)
    if (parent[end] === -1) {
        return null;
    }
    // Reconstruct the path from end to initial
    var path = null;
    var current = end;
    // Build path backwards from end to initial
    while (current !== -1) {
        path = (0, list_1.pair)(current, path);
        current = parent[current];
    }
    return path;
}
