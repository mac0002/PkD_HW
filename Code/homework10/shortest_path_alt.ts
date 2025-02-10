import {
    List, list, Pair, pair, for_each, filter, is_null, head, tail,
    append, flatten
} from '../lib/list';

import {
    type Queue, empty as empty, is_empty, enqueue, dequeue, head as qhead
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
export function lg_shortest_path({adj, size}: ListGraph, initial: number, end: number): List<number> {
    // If initial and end are the same, return a list with just that node
    if (initial === end) {
        return list(initial);
    }

    // Initialize colors array for tracking visited nodes
    const colors = build_array(size, () => white);

    // Initialize parent array to track the path
    const parent = build_array(size, () => -1);

    // Create queue and enqueue initial node
    const queue: Queue<number> = empty();
    enqueue(initial, queue);
    colors[initial] = grey;

    // BFS traversal
    while (!is_empty(queue)) {
        const current = qhead(queue);
        dequeue(queue);

        // Get adjacent nodes
        const neighbors = adj[current];

        // Process each neighbor
        for_each((neighbor: number) => {
            if (colors[neighbor] === white) {
                colors[neighbor] = grey;
                parent[neighbor] = current;
                enqueue(neighbor, queue);

                // If we found the end node, we can stop
                if (neighbor === end) {
                    // Clear the queue to end the while loop
                    while (!is_empty(queue)) {
                        dequeue(queue);
                    }
                }
            }
        }, neighbors);

        colors[current] = black;
    }

    // If end node was not reached (parent[end] is still -1)
    if (parent[end] === -1) {
        return null;
    }

    // Reconstruct the path from end to initial
    let path: List<number> = null;
    let current = end;

    // Build path backwards from end to initial
    while (current !== -1) {
        path = pair(current, path);
        current = parent[current];
    }

    return path;
}

