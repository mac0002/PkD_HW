// extend imports as needed
import { Pair, List, head, tail, pair, is_null, remove, map, length } from '../lib/list';
import { hash_id, HashFunction, ChainingHashtable, ProbingHashtable,
    ch_empty, ch_lookup, ch_insert, ch_keys, ch_delete,
    ph_empty, ph_lookup, ph_insert, ph_keys, ph_delete
} from '../lib/hashtables';
import {
    empty as empty_stack, is_empty as isempty_stack, NonEmptyStack, Stack, display_stack, pop, top, push,
    empty
} from "../lib/stack"
import { hasUncaughtExceptionCaptureCallback } from 'process';

/* DO NOT MODIFY these type declarations */
export type People = List<Pair<number,string>>;
export type Relations = List<Pair<number,number>>;
export type Person = {
    id: number, // the identifier as described above
    name: string,
    parents: Array<number>,
    children: Array<number>
};
export type PersonTable = ProbingHashtable<number,Person>;
/* End of type declarations */

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ADDITIONAL, NOT TAKEN FROM ORIGINAL TEMPLATE
// Solution check:
// 
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export type birth_id = number;

export type npc_name = string;

export type all_bloodlines = Array<Array<number>>

type parent_lines = Array<Array<number>>

export function make_npc(id: birth_id, name: npc_name): Pair<number,string> {
    return pair(id, name);
}

/**
 * 
 * @param people_id 
 * @param relatives 
 * @returns 
 */
function finding_Marlin(people_id: number, relatives: Relations): number | null {
    if (is_null(relatives)) {
        return null;
    } else if (tail(head(relatives)) === people_id) {
        return head(head(relatives));
    } else {
        return finding_Marlin(people_id, tail(relatives));
    }
    // return is_null(relatives)
    //         ? undefined
    //         : tail(head(relatives)) === people_id 
    //             ? head(head(relatives))
    //             : finding_Marlin(people_id, tail(relatives));
}

/**
 * 
 * @param people_id 
 * @param relatives 
 * @returns 
 */
function finding_Nemo(people_id: number, relatives: Relations): number | null {
    if (is_null(relatives)) {
        return null;
    } else if (head(head(relatives)) === people_id) {
        return tail(head(relatives));
    } else {
        return finding_Nemo(people_id, tail(relatives));
    }
}

// (6,7)
// (1,2)
// (3,4)
// (2,3)
// (0,1)
// First method: chaining. Use parent to find its parents until reaching undefined parent or none found,
// then go the other way to find all its children 

function go_up(id: number, rel: Relations, parent_line: Array<number>): Array<number> {
    // if id = 3
    // [2,1,0]
    const parent_id = finding_Marlin(id, rel);
    if (is_null(rel)) {
        return parent_line;
    } else if (is_null(parent_id)) {
        return parent_line.reverse();
    } else {
        const new_rel = remove(pair(parent_id, id), rel);
        parent_line.push(parent_id);
        return go_up(parent_id, new_rel, parent_line)
    }
}

function go_down(id: number, rel: Relations, child_line: Array<number>): Array<number> {
    // [4,5,6]
    const child_id = finding_Nemo(id, rel);
    if (is_null(rel)) {
        return child_line;
    } else if (is_null(child_id)) {
        return child_line;
    } else {
        const new_rel = remove(pair(id, child_id), rel);
        child_line.push(child_id);
        return go_down(child_id, new_rel, child_line)
    }
}


function test(rel: Relations, map_full: Array<Array<number>>): Array<Array<number>> {
    if (is_null(rel)) {
        return map_full
    } else {
        const id = head(head(rel));
        const parent_line = go_up(id, rel, []);
        const child_line = go_down(id, rel, []);
        const a_bloodline = parent_line.concat(id).concat(child_line);
        map_full.push(a_bloodline);
        
    }

    if (is_null(rel)) {
        return map_full
    } else {
        const the_parent = head(head(rel));
        const the_child = tail(head(rel));
        for (let i = 0; i <= map_full.length; i = i + 1) {
            if (map_full[i].indexOf(the_parent) > -1) {
                break;
            }
            if (i === map_full.length && map_full[i].indexOf(the_parent) === -1) {
                map_full.push([the_parent, the_child])
            }
        }
        const new_rel = remove(pair(the_parent, the_child), rel)
        return test(new_rel, map_full)
    }
}

function make_1bloodline(parent: number, rel: Relations, parent_line: Array<number>): void {

    }

function full_bloodline_map(relatives: Relations): Array<Array<number>> | undefined {
    const parent_line: Array<number> = [];
    const bloodlines: Array<Array<number>> = [];
    const R_list = relatives;
//  use id to find first parent
    // if (is_null(relatives)) {
    //     return undefined
    // } else {

    //     }
    //     const parent_id = head(head(relatives))
    //     const child_id = tail(head(relatives))
    //     parent_line.push(parent_id)
    //     parent_line.push(child_id)
    //     relatives = remove(pair(parent_id, child_id), relatives)
    //     const next_child = finding_Nemo(child_id, relatives)
    //     parent_line.push(next_child)
    // }
    return bloodlines;
}

// export const make_npc = (id: birth_id, name: npc_name) => pair(id, name);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/**
 * Create a hash table of Person records based on given relations.
 * @precondition All ids appearing in relations are in the people list.
 * @param people peoples ids and names
 * @param relations parent-child relations
 * @return Returns a hash table with a Person record for each person from people
 *     that includes all relationships according relations.
 */
export function toHashtable(people: People, relations: Relations): PersonTable {
    if (is_null(people)) {
        return ph_empty(0, hash_id);
    } else {
        const persontable: PersonTable = ph_empty(length(people), hash_id);
        function helper(P_list: People, R_list: Relations, P_table: PersonTable): PersonTable {
            if (is_null(P_list)){
                return P_table;
            } else {
                const person_id = head(head(P_list));
                const person_name = tail(head(P_list));
                const parent = finding_Marlin(person_id, R_list);
                const child = finding_Nemo(person_id, R_list);
                const person_info: Person  = {
                    id: person_id,
                    name: person_name,
                    parents: go_up(person_id, R_list, []).reverse(),
                    children: go_down(person_id, R_list, [])
                }
                
                const insert = ph_insert(P_table , person_id, person_info);
                // console.log(insert)
                return helper(tail(P_list), R_list, P_table)
            }

        }
        return helper(people, relations, persontable)
        
    }
}


/**
 * Computes the descendants of a person.
 * @param ht Relationships of people
 * @param id Identification number of the person to compute the descendants for
 * @returns Returns all the descendants of the person with ID id, according to
 *     the relationships in ht, or undefined if the person with ID is is not
 *     found in ht.
 */
export function descendants(ht: PersonTable, id: number): Array<number> | undefined {
    if (ph_lookup(ht, id) === undefined) {
        return undefined
    } else {
        const offspring = ph_lookup(ht, id)?.children
        return offspring
    }
}
