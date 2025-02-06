"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Homework 9 mandatory - testing ground
var list_1 = require("../lib/list");
var person_table_1 = require("./person_table");
var hashtables_1 = require("../lib/hashtables");
var fantasy_people = (0, list_1.list)((0, list_1.pair)(121100001234, "Geralt"), (0, list_1.pair)(122000003333, "Lambert"), (0, list_1.pair)(110000001233, "Geralt's parent"), (0, list_1.pair)(125205016789, "Ciri"), (0, list_1.pair)(119000004444, "Lambert's parent"), (0, list_1.pair)(127400008888, "Lambi"));
var fantasy_relations = (0, list_1.list)((0, list_1.pair)(110000001233, 121100001234), (0, list_1.pair)(121100001234, 125205016789), (0, list_1.pair)(119000004444, 122000003333), (0, list_1.pair)(122000003333, 127400008888));
var people_two_only = (0, list_1.list)((0, list_1.pair)(140002024952, "Zero"), (0, list_1.pair)(142010249985, "Twenty"));
var relation_two_only = (0, list_1.list)((0, list_1.pair)(140002024952, 142010249985));
var people_chained = (0, list_1.list)((0, list_1.pair)(100011229432, "A"), (0, list_1.pair)(102307281045, "B"), (0, list_1.pair)(104403152943, "C"), (0, list_1.pair)(106904240039, "D"), (0, list_1.pair)(109005028891, "E"), (0, list_1.pair)(112006230592, "F"), (0, list_1.pair)(114301197682, "G"), (0, list_1.pair)(117109086650, "H"));
var relation_chained = (0, list_1.list)((0, list_1.pair)(114301197682, 117109086650), // (G,H)
(0, list_1.pair)(100011229432, 102307281045), // (A,B)
(0, list_1.pair)(106904240039, 109005028891), // (D,E)
(0, list_1.pair)(104403152943, 106904240039), // (C,D)
(0, list_1.pair)(109005028891, 112006230592), // (E,F)
(0, list_1.pair)(102307281045, 104403152943), // (B,C)
(0, list_1.pair)(112006230592, 114301197682)); // (F,G)
var null_people = (0, list_1.list)();
var null_relations = (0, list_1.list)();
var BCE_people = (0, list_1.list)((0, list_1.pair)(-100500005277, "V"), (0, list_1.pair)(-102500002968, "XXV"));
var BCE_relations = (0, list_1.list)((0, list_1.pair)(-102500002968, -100500005277));
var fantasy_ht = (0, person_table_1.toHashtable)(fantasy_people, fantasy_relations);
var Ciri = {
    id: 125205016789,
    name: "Ciri",
    parents: [121100001234, 110000001233],
    children: []
};
console.log(fantasy_ht);
console.log((0, hashtables_1.ph_lookup)(fantasy_ht, 125205016789));
var table_for_two = (0, person_table_1.toHashtable)(people_two_only, relation_two_only);
var chained_ht = (0, person_table_1.toHashtable)(people_chained, relation_chained);
console.log(chained_ht);
console.log((0, person_table_1.descendants)(chained_ht, 102307281045));
var null_ht = (0, person_table_1.toHashtable)(null_people, null_relations);
var BCE_ht = (0, person_table_1.toHashtable)(BCE_people, BCE_relations);
// toHashtable tests
test('find Ciri', function () {
    expect((0, hashtables_1.ph_lookup)(fantasy_ht, 125205016789)).toStrictEqual(Ciri);
});
test("expect empty table with empty people", function () {
    expect(null_ht).toStrictEqual((0, hashtables_1.ph_empty)(0, hashtables_1.hash_id));
});
test("number of people from BCE", function () {
    expect(BCE_ht.entries).toStrictEqual(2);
});
test("id of the two", function () {
    expect(table_for_two.keys).toStrictEqual([140002024952, 142010249985]);
});
test("number of people in chained bloodline", function () {
    expect(chained_ht.entries).toStrictEqual(8);
});
// descendants tests
test("descendants of Geralt's parent", function () {
    expect((0, person_table_1.descendants)(fantasy_ht, 110000001233)).toStrictEqual([121100001234, 125205016789]);
});
test('descendants of Geralt', function () {
    expect((0, person_table_1.descendants)(fantasy_ht, 121100001234)).toStrictEqual([125205016789]);
});
test('descendants of B', function () {
    expect((0, person_table_1.descendants)(chained_ht, 102307281045)).toStrictEqual([
        104403152943, 106904240039,
        109005028891, 112006230592,
        114301197682, 117109086650
    ]);
});
test("person id NOT FOUND", function () {
    expect((0, person_table_1.descendants)(chained_ht, 102307289999)).toStrictEqual(undefined);
});
test("BCE descendants", function () {
    expect((0, person_table_1.descendants)(BCE_ht, -100500005277)).toStrictEqual([]);
});
