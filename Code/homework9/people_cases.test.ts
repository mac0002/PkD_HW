// Homework 9 mandatory - test cases 
import { Pair, List, head, tail, pair, is_null, list } from '../lib/list';
import { People, Relations, Person, PersonTable, toHashtable,  } from './person_table';

const fantasy_people: People = list(pair(121100001234, "Geralt"), pair(122000003333, "Lambert" ));
const fantasy_relations: Relations = list(pair(110000001233, 125205016789), pair(119000004444, 127400008888))

console.log()