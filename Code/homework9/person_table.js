"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_npc = make_npc;
exports.toHashtable = toHashtable;
exports.descendants = descendants;
// extend imports as needed
var list_1 = require("../lib/list");
var hashtables_1 = require("../lib/hashtables");
function make_npc(id, name) {
    return (0, list_1.pair)(id, name);
}
// --------------------------------------------------
/**
 * @precondition Id must be from a existing person in people list
 * @param people_id id of the specific person
 * @param relatives A Relation list
 * @returns the closest parent of the specific person. Uses recursion to
 *      scan through the Relation list.
 */
function finding_Marlin(people_id, relatives) {
    if ((0, list_1.is_null)(relatives)) {
        return null;
    }
    else if ((0, list_1.tail)((0, list_1.head)(relatives)) === people_id) {
        return (0, list_1.head)((0, list_1.head)(relatives));
    }
    else {
        return finding_Marlin(people_id, (0, list_1.tail)(relatives));
    }
    // return is_null(relatives)
    //         ? undefined
    //         : tail(head(relatives)) === people_id 
    //             ? head(head(relatives))
    //             : finding_Marlin(people_id, tail(relatives));
}
/**
 * @precondition Id must be from a existing person in people list
 * @param people_id id of the specific person
 * @param relatives A Relation list
 * @returns the closest child of the specific person. Uses recursion to
 *      scan through the Relation list.
 */
function finding_Nemo(people_id, relatives) {
    if ((0, list_1.is_null)(relatives)) {
        return null;
    }
    else if ((0, list_1.head)((0, list_1.head)(relatives)) === people_id) {
        return (0, list_1.tail)((0, list_1.head)(relatives));
    }
    else {
        return finding_Nemo(people_id, (0, list_1.tail)(relatives));
    }
}
// (6,7)
// (1,2)
// (3,4)
// (2,3)
// (0,1)
// First method: chaining. Use parent to find its parents until reaching undefined parent or none found,
// then go the other way to find all its children 
/**
 * Finds all person's forebearers with a Relation list, goes upwards in the bloodline,
 * and stores the information as an array of forebearer ids.
 * @precondition Id must be from a existing person in people list
 * @param id id of the specific person
 * @param rel A Relation list
 * @param parent_line An array of all forefathers, empty first then push
 * @returns Returns an array of parents with the closest parent being the first
 *      in the array
 */
function go_up(id, rel, parent_line) {
    // if id = 3
    // [2,1,0]
    var parent_id = finding_Marlin(id, rel);
    if ((0, list_1.is_null)(rel)) {
        return parent_line;
    }
    else if ((0, list_1.is_null)(parent_id)) {
        return parent_line.reverse();
    }
    else {
        var new_rel = (0, list_1.remove)((0, list_1.pair)(parent_id, id), rel);
        parent_line.push(parent_id);
        return go_up(parent_id, new_rel, parent_line);
    }
}
/**
 * Finds all person's offsprings with a Relation list, goes downwards in the bloodline,
 * and stores the information as an array of offspring ids.
 * @precondition Id must be from a existing person in people list
 * @param id id of the specific person
 * @param rel A Relation list
 * @param parent_line An array of all forefathers, empty first then push
 * @returns Returns an array of children with the closest child being the first
 *      in the array
 */
function go_down(id, rel, child_line) {
    // [4,5,6]
    var child_id = finding_Nemo(id, rel);
    if ((0, list_1.is_null)(rel)) {
        return child_line;
    }
    else if ((0, list_1.is_null)(child_id)) {
        return child_line;
    }
    else {
        var new_rel = (0, list_1.remove)((0, list_1.pair)(id, child_id), rel);
        child_line.push(child_id);
        return go_down(child_id, new_rel, child_line);
    }
}
// --------------------------------------------------
// NOT USED
function test(rel, map_full) {
    if ((0, list_1.is_null)(rel)) {
        return map_full;
    }
    else {
        var id = (0, list_1.head)((0, list_1.head)(rel));
        var parent_line = go_up(id, rel, []);
        var child_line = go_down(id, rel, []);
        var a_bloodline = parent_line.concat(id).concat(child_line);
        map_full.push(a_bloodline);
    }
    if ((0, list_1.is_null)(rel)) {
        return map_full;
    }
    else {
        var the_parent = (0, list_1.head)((0, list_1.head)(rel));
        var the_child = (0, list_1.tail)((0, list_1.head)(rel));
        for (var i = 0; i <= map_full.length; i = i + 1) {
            if (map_full[i].indexOf(the_parent) > -1) {
                break;
            }
            if (i === map_full.length && map_full[i].indexOf(the_parent) === -1) {
                map_full.push([the_parent, the_child]);
            }
        }
        var new_rel = (0, list_1.remove)((0, list_1.pair)(the_parent, the_child), rel);
        return test(new_rel, map_full);
    }
}
function make_1bloodline(parent, rel, parent_line) {
}
function full_bloodline_map(relatives) {
    var parent_line = [];
    var bloodlines = [];
    var R_list = relatives;
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
// --------------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**
 * Create a hash table of Person records based on given relations.
 * @precondition All ids appearing in relations are in the people list.
 * @param people peoples ids and names
 * @param relations parent-child relations
 * @return Returns a hash table with a Person record for each person from people
 *     that includes all relationships according relations.
 */
function toHashtable(people, relations) {
    if ((0, list_1.is_null)(people)) {
        return (0, hashtables_1.ph_empty)(0, hashtables_1.hash_id);
    }
    else {
        var persontable = (0, hashtables_1.ph_empty)((0, list_1.length)(people), hashtables_1.hash_id);
        function helper(P_list, R_list, P_table) {
            if ((0, list_1.is_null)(P_list)) {
                return P_table;
            }
            else {
                var person_id = (0, list_1.head)((0, list_1.head)(P_list));
                var person_name = (0, list_1.tail)((0, list_1.head)(P_list));
                // const parent = finding_Marlin(person_id, R_list);
                // const child = finding_Nemo(person_id, R_list);
                var person_info = {
                    id: person_id,
                    name: person_name,
                    parents: go_up(person_id, R_list, []).reverse(),
                    children: go_down(person_id, R_list, [])
                };
                var insert = (0, hashtables_1.ph_insert)(P_table, person_id, person_info);
                // console.log(insert)
                return helper((0, list_1.tail)(P_list), R_list, P_table);
            }
        }
        return helper(people, relations, persontable);
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
function descendants(ht, id) {
    var _a;
    if ((0, hashtables_1.ph_lookup)(ht, id) === undefined) {
        return undefined;
    }
    else {
        var offspring = (_a = (0, hashtables_1.ph_lookup)(ht, id)) === null || _a === void 0 ? void 0 : _a.children;
        return offspring;
    }
}
