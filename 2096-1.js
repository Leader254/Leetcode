// Definition for a binary tree node.
function TreeNode(val, left, right) {
this.val = (val===undefined ? 0 : val)
this.left = (left===undefined ? null : left)
this.right = (right===undefined ? null : right)
}



// @param {TreeNode} root
// @param {number} startValue
// @param {number} destValue
// @return {string}

var getDirections = function(root, startValue, destValue) {
    // Find the path from root to a given target node
    function findPath(node, target, path) {
        if (!node) return false;
        if (node.val === target) return true;

        path.push('L');
        if (findPath(node.left, target, path)) return true;
        path.pop();

        path.push('R');
        if (findPath(node.right, target, path)) return true;
        path.pop();

        return false;
    }

    // Find the LCA of startValue and destValue
    function findLCA(node, startValue, destValue) {
        if (!node) return null;
        if (node.val === startValue || node.val === destValue) return node;

        const left = findLCA(node.left, startValue, destValue);
        const right = findLCA(node.right, startValue, destValue);

        if (left && right) return node;
        return left ? left : right;
    }

    // Find the paths from root to startValue and destValue
    function getPathFromLCA(node, startValue, destValue) {
        const lca = findLCA(node, startValue, destValue);

        const startPath = [];
        const destPath = [];

        findPath(lca, startValue, startPath);
        findPath(lca, destValue, destPath);

        return {
            startPath: startPath,
            destPath: destPath
        };
    }

    const { startPath, destPath } = getPathFromLCA(root, startValue, destValue);

    // Convert paths to the required format
    const commonLength = Math.min(startPath.length, destPath.length);
    let i = 0;
    while (i < commonLength && startPath[i] === destPath[i]) {
        i++;
    }

    // Steps to go up from startValue to LCA
    const upSteps = 'U'.repeat(startPath.length - i);

    // Steps to go down from LCA to destValue
    const downSteps = destPath.slice(i).join('');

    return upSteps + downSteps;
};

// Example usage:

// Build the binary tree
function buildTree(values) {
    if (!values.length) return null;
    const root = new TreeNode(values[0]);
    const queue = [root];
    let i = 1;
    while (i < values.length) {
        const node = queue.shift();
        if (values[i] !== null) {
            node.left = new TreeNode(values[i]);
            queue.push(node.left);
        }
        i++;
        if (i < values.length && values[i] !== null) {
            node.right = new TreeNode(values[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

// Example binary tree
//     5
//    / \
//   1   2
//  /   / \
// 3   6   4

const values = [5, 1, 2, 3, null, 6, 4];
const root = buildTree(values);

console.log(getDirections(root, 3, 6)); // Expected output: "UURL"
console.log(getDirections(root, 6, 4)); // Expected output: "UR"
