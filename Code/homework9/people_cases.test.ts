// Homework 9 mandatory - testing ground
import { Pair, List, head, tail, pair, is_null, list} from '../lib/list';
import { People, Relations, Person, PersonTable, toHashtable, descendants} from './person_table';
import { hash_id, HashFunction, ChainingHashtable, ProbingHashtable,
    ch_empty, ch_lookup, ch_insert, ch_keys, ch_delete,
    ph_empty, ph_lookup, ph_insert, ph_keys, ph_delete
} from '../lib/hashtables';
import exp = require('constants');

const fantasy_people: People = list(pair(121100001234, "Geralt"), pair(122000003333, "Lambert" ),
                                    pair(110000001233, "Geralt's parent"), pair(125205016789, "Ciri"),
                                    pair(119000004444, "Lambert's parent"), pair(127400008888, "Lambi"));
const fantasy_relations: Relations = list(pair(110000001233, 121100001234), 
                                          pair(121100001234, 125205016789),
                                          pair(119000004444, 122000003333),
                                          pair(122000003333, 127400008888));

const people_two_only: People = list(pair(140002024952,"Zero"), pair(142010249985,"Twenty"));
const relation_two_only: Relations = list(pair(140002024952, 142010249985));

const people_chained: People = list(pair(100011229432, "A"), pair(102307281045, "B"),
                                    pair(104403152943, "C"), pair(106904240039, "D"),
                                    pair(109005028891, "E"), pair(112006230592, "F"),
                                    pair(114301197682, "G"), pair(117109086650, "H"));
const relation_chained: Relations = list(pair(114301197682, 117109086650), // (G,H)
                                         pair(100011229432, 102307281045), // (A,B)
                                         pair(106904240039, 109005028891), // (D,E)
                                         pair(104403152943, 106904240039), // (C,D)
                                         pair(109005028891, 112006230592), // (E,F)
                                         pair(102307281045, 104403152943), // (B,C)
                                         pair(112006230592, 114301197682));// (F,G)

const null_people: People = list();
const null_relations: Relations = list();

const BCE_people: People = list(pair(-100500005277, "V"), pair(-102500002968, "XXV"));
const BCE_relations: Relations = list(pair(-102500002968, -100500005277));

const fantasy_ht: PersonTable = toHashtable(fantasy_people, fantasy_relations);
const Ciri: Person = {
    id: 125205016789,
    name: "Ciri",
    parents: [121100001234, 110000001233],
    children: []
};
// console.log(fantasy_ht);
// console.log(ph_lookup(fantasy_ht, 125205016789));

const table_for_two: PersonTable = toHashtable(people_two_only, relation_two_only);

const chained_ht: PersonTable = toHashtable(people_chained, relation_chained);
// console.log(chained_ht);

const null_ht: PersonTable = toHashtable(null_people, null_relations);

const BCE_ht: PersonTable = toHashtable(BCE_people, BCE_relations);


// toHashtable tests
test('find Ciri', () => {
    expect(ph_lookup(fantasy_ht, 125205016789)).toStrictEqual(Ciri);
});

test("expect empty table with empty people", () => {
    expect(null_ht).toStrictEqual(ph_empty(0, hash_id));
});

// descendants tests
test("descendants of Geralt's parent", () => {
    expect(descendants(fantasy_ht, 110000001233)).toStrictEqual([121100001234, 125205016789]);
});

test('descendants of Geralt', () => {
    expect(descendants(fantasy_ht, 121100001234)).toStrictEqual([125205016789]);
});

test('descendants of B', () => {
    expect(descendants(chained_ht, 102307281045)).toStrictEqual([
        104403152943, 106904240039,
        109005028891, 112006230592,
        114301197682, 117109086650 
    ]);
});

test("person id NOT FOUND", () => {
    expect(descendants(chained_ht, 102307289999)).toStrictEqual(undefined)
});