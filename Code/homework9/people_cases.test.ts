// Homework 9 mandatory - test cases 
import { Pair, List, head, tail, pair, is_null, list} from '../lib/list';
import { People, Relations, Person, PersonTable, toHashtable, descendants} from './person_table';

const fantasy_people: People = list(pair(121100001234, "Geralt"), pair(122000003333, "Lambert" ),
                                    pair(110000001233, "Geralt's parent"), pair(125205016789, "Ciri"),
                                    pair(119000004444, "Lambert's parent"), pair(127400008888, "Lambi"));
const fantasy_relations: Relations = list(pair(110000001233, 121100001234), 
                                          pair(121100001234, 125205016789),
                                          pair(119000004444, 122000003333),
                                          pair(122000003333, 127400008888));

const people_two_only: People = list(pair(140002024952,"Zero"),pair(142010249985,"Twenty"));
const relation_two_only: Relations = list(pair(140002024952,142010249985));

const null_people: People = list();
const null_relations: Relations = list();

const BCE_people: People = list(pair(-100500005277, "V"), pair(-102500002968, "XXV"));
const BCE_relations: Relations = list(pair(-102500002968, -100500005277));

const fantasy_ht: PersonTable = toHashtable(fantasy_people, fantasy_relations);
console.log(fantasy_ht)