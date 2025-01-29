// A Tree can be either a Leaf (empty tree) or an inner node (TreeNode)
export type Tree<T> = Leaf | TreeNode<T>;
export type Leaf = null;
// A TreeNode is a tuple of its entry, left child, and right child.
export type TreeNode<T> = [T, Tree<T>, Tree<T>];

/**
 * Get the value of a tree node.
 * @template T the type of the values in the tree
 * @argument node the tree node.
 * @returns Returns the value in the node.
 */
export function value<T>(tree : TreeNode<T>): T {
	return tree[0];
}

/**
 * Get the left child of a tree node.
 * @template T the type of the values in the tree
 * @argument node the tree node.
 * @returns Returns the left child of the node.
 */
export function left_branch<T>(tree: TreeNode<T>): Tree<T> {
	return tree[1];
}

/**
 * Get the right child of a tree node.
 * @template T the type of the values in the tree
 * @argument node the tree node.
 * @returns Returns the right child of the node.
 */
export function right_branch<T>(tree: TreeNode<T>): Tree<T> {
	return tree[2];
}

/**
 * Constructs an inner node in a tree.
 * @template T the type of the values in the tree
 * @argument value the value of the new node.
 * @argument left the left child of the new node.
 * @argument right the right child of the new node.
 * @returns Returns a new node with the given value and children.
 */
export function make_tree<T>(value: T, left: Tree<T>, right: Tree<T>): Tree<T> {
	return [value, left, right];
}

/**
 * Constructs an empty tree.
 * @returns Returns the empty tree.
 */
export function make_empty_tree(): null {
	return null;
}

/**
 * Check if a tree is empty.
 * @template T the type of the values in the tree
 * @argument node the tree.
 * @returns Returns true iff the tree is empty (null).
 */

export function is_empty_tree<T>(tree: Tree<T>): tree is null {
	return tree === null;
}

/**
 * Constructs a tree with a single internal node.
 * Convenience function.
 * @template T the type of the value
 * @argument value the value of the node.
 * @returns Returns a new node with the given value.
 */
export function make_shrub<T>(value: T): Tree<T> {
	return make_tree(value,
                 	make_empty_tree(),
                 	make_empty_tree());
}


/**
 * Display a tree in a simple textual format
 * @template T the type of the values in the tree
 * @argument tree the tree.
 */

export function display_tree<T>(tree: Tree<T>) {
    return display_tree_helper(tree, "", true);
}

/**
 * Display a tree in a simple textual format
 * @template T the type of the values in the tree
 * @argument tree the tree.
 * @argument path string prefix showing the depth of the the current node.
 * @argument leftmost whether this is the leftmost branch.
 */
function display_tree_helper<T>(tree: Tree<T>, path: string, leftmost: boolean) {
    if (is_empty_tree(tree)) {
        return;
    } else {
        const v = value(tree);
        // print tree label, with indentation pre-fixed
        console.log(path + "├─ " + v);

        // print right node first, then left
        if (leftmost) {
            display_tree_helper(right_branch(tree), "   " + path, false);
            display_tree_helper(left_branch(tree), "   " + path, leftmost);
        } else {
			display_tree_helper(right_branch(tree), path + "|  ", false);
			display_tree_helper(left_branch(tree), path + "|  ", leftmost);
        }
    }
}

/**
 * Construct a new tree with given elements.
 * The tree will be balanced.
 * @template T the type of the elements
 * @argument elements array of elements.
 * @returns Returns a new tree containing the given elements.
 */
function build_tree<T>(elements: Array<T>): Tree<T> {
	function build(from: number, to: number): Tree<T> {
    	if (from > to) {
            return make_empty_tree();
        } else {
            const middle = Math.floor((from + to)/2);
            return make_tree(elements[middle],
                             build(from, middle - 1),
                             build(middle + 1, to));
        }            
	}
	return build(0, elements.length - 1);
}

/**
 * Get the character at a given index in a string.
 * Indices start at 0.
 * @argument str the string
 * @argument i the index
 * @returns the character at index i in str, 
 *     or undefined if i is >= the length of str
 */
function char_at(str: string, i: number): string | undefined {
	return str[i];
}

/**
 * Get one path to the given element in a tree.
 * @template T the type of the elements in the tree
 * @argument tree the tree to search.
 * @argument elem the element to search for.
 * @returns Returns a path to elem in tree 
 *     consisting of the characters L and R, 
 *     or null iff elem does not occur in tree.
 */
export function path_for_element<T>(tree: Tree<T>, elem: T): string | null {
	function move(tree: Tree<T>, path: string): string | null {
		if (is_empty_tree(tree)) {
			return null;
		} else {
			const current = value(tree);
			return current === elem
				? path
				: current > elem
				? move(left_branch(tree), path + 'L')
				: move(right_branch(tree), path + 'R');
		}
	}
	return move(tree, "");
}

/**
 * Get the element at a given path in a tree.
 * @template T the type of the elements in the tree
 * @argument tree the tree to search.
 * @argument path a path to follow.
 * @precondition path only contains the characters L and R.
 * @returns Returns the element at the path in tree, 
 *     or null iff the path leads to an empty tree, 
 *     or undefined iff the path goes beyond the leaves of tree.
 */
export function element_for_path<T>(tree: Tree<T>, path: string): T | undefined | null {
	function move(tree: Tree<T>, path_index: number): T | undefined | null {
		const char = char_at(path, path_index);
		if (is_empty_tree(tree)) {
			return char === undefined ? null : undefined;
		} else {
			return char === "R"
				? move(right_branch(tree), path_index + 1)
				: char === "L"
				? move(left_branch(tree), path_index + 1)
				: value(tree);
		}
	}
	return move(tree, 0);
}
/*
function test_task(tree, element) {
    return element_for_path(tree, path_for_element(tree, element)) === element;
}
*/

function test_task<T>(tree: Tree<T>, element: T): boolean | undefined {
    const path = path_for_element(tree, element);
    return path !== null && path != undefined
           ? element_for_path(tree, path) === element
	       : undefined;
}

const elems1 = [5, 3, 1, 4, 7, 9];
const tree1 = build_tree(elems1);
console.log(path_for_element(tree1, 9)); // Should display: RR
console.log(path_for_element(tree1, 4)); // Should display: RL
console.log(path_for_element(tree1, 1)); // Should display: 
console.log(path_for_element(tree1, 0)); // Should display: null
console.log(test_task(tree1, 4)); // Should display: true
