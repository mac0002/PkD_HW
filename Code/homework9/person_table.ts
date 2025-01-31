// extend imports as needed
import { Pair, List, head, tail, pair, is_null } from '../lib/list';
import { hash_id, HashFunction, ChainingHashtable, ProbingHashtable,
    ch_empty, ch_lookup, ch_insert, ch_keys, ch_delete,
    ph_empty, ph_lookup, ph_insert, ph_keys, ph_delete
} from '../lib/hashtables';

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

export function make_npc(id: birth_id, name: npc_name): Pair<number,string> {
    return pair(id, name)
}

/**
 * 
 * @param people_id 
 * @param relatives 
 * @returns 
 */
function finding_Marlin(people_id: number, relatives: Relations): number | undefined {
    if (is_null(relatives) === true) {
        return undefined
    } else if (tail(head(relatives)) === people_id) {
        return head(head(relatives))
    } else {
        return finding_Marlin(people_id, tail(relatives))
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
function finding_Nemo(people_id: number, relatives: Relations): number | undefined {
    if (is_null(relatives) === true) {
        return undefined
    } else if (head(head(relatives)) === people_id) {
        return tail(head(relatives))
    } else {
        return finding_Nemo(people_id, tail(relatives))
    }
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
    if (is_null(people) === true) {
        return ph_empty(0, hash_id)
    } else {
        
            
        }
    }
    // return is_null(people) 
    //        ? ph_empty(0, hash_id)
    //        : 
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
    
    return undefined;
}
