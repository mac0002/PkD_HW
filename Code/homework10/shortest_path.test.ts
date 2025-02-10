// shortest_path test suite
import * as graphs from "../lib/graphs";
import * as lists from "../lib/list";
import * as t1 from "./shortest_path";
import * as q_arr from "../lib/queue_array";
import { serialize } from "v8";
import * as t1_alt from "./shortest_path_alt"

const ex_graph_task1: graphs.ListGraph = graphs.lg_new(6);
ex_graph_task1.adj = [lists.list(1, 2), // Node name/value 1, id 0
                      lists.list(3, 5), // ... 
                      lists.list(3, 4),
                      lists.list(4),
                      lists.list(5),    // ...
                      lists.list()];    // Node name/value 6, id 5

const ex_ans_1to4: lists.List<number> = lists.list(1, 2, 4);
const ex_ans_1to6: lists.List<number> = lists.list(1, 2, 6);
const ex_ans_5to2: lists.List<number> = lists.list();
console.log(ex_graph_task1);

test("Shortest path from 1 to 4", () => {
    expect(t1.lg_shortest_path(ex_graph_task1, 0, 3)).toStrictEqual(ex_ans_1to4)
})
// console.log(t1.lg_shortest_path(ex_graph_task1, 0, 3));

test("Shortest path from 1 to 6", () => {
    expect(t1.lg_shortest_path(ex_graph_task1, 0, 5)).toStrictEqual(ex_ans_1to6)
})
// console.log(t1.lg_shortest_path(ex_graph_task1, 0, 5));

test("Shortest path from 5 to 2", () => {
    expect(t1.lg_shortest_path(ex_graph_task1, 4, 1)).toStrictEqual(ex_ans_5to2)
})

test("Shortest path from 4 to 4", () => {
    expect(t1.lg_shortest_path(ex_graph_task1, 3, 3)).toStrictEqual(null)
})

test("Shortest path from 6 to 1", () => {
    expect(t1.lg_shortest_path(ex_graph_task1, 5, 0)).toStrictEqual(null)
})