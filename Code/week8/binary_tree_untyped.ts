/**
 * Get the value of a tree node.
 * @argument node the tree node.
 * @returns Returns the value in the node.
 */
function value(tree) {
	return tree[0];
}

/**
 * Get the left child of a tree node.
 * @argument node the tree node.
 * @returns Returns the left child of the node.
 */
function left_branch(tree) {
	return tree[1];
}

/**
 * Get the right child of a tree node.
 * @argument node the tree node.
 * @returns Returns the right child of the node.
 */
function right_branch(tree) {
	return tree[2];
}

/**
 * Constructs an inner node in a tree.
 * @argument value the value of the new node.
 * @argument left the left child of the new node.
 * @argument right the right child of the new node.
 * @returns Returns a new node with the given value and children.
 */
function make_tree(value, left, right) {
	return [value, left, right];
}

/**
 * Constructs an empty tree.
 * @returns Returns the empty tree.
 */
function make_empty_tree() {
	return null;
}

/**
 * Check if a tree is empty.
 * @argument node the tree.
 * @returns Returns true iff the tree is empty (null).
 */
function is_empty_tree(tree): tree is null {
	return tree === null;
}

/**
 * Constructs a tree with a single internal node.
 * Convenience function.
 * @argument value the value of the node.
 * @returns Returns a new node with the given value.
 */
function make_shrub(value) {
	return make_tree(value,
                 	make_empty_tree(),
                 	make_empty_tree());
}

/**
 * Display a tree in a simple textual format
 * @argument tree the tree.
 */
function display_tree(tree) {
    /**
     * Display a tree in a simple textual format
     * @argument tree the tree.
     * @argument path string prefix showing the depth of the the current node.
     * @argument leftmost whether this is the leftmost branch.
     */

    function display_tree_helper(tree, path, leftmost) {
        if (tree === null) {
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
    return display_tree_helper(tree, "", true);
}

/**
 * Construct a new tree with given content.
 * The tree will be balanced.
 * @argument elements array of elements.
 * @returns Returns a new tree containing the given elements.
 */
function build_tree(elements) {
	function build(from, to) {
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