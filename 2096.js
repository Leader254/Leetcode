//  Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// @param {TreeNode} root
// @param {number} startValue
// @param {number} destValue
// @return {string}

var getDirections = function (root, startValue, destValue) {
  function getPath(cur, targetValue, path, result) {
    if (!cur) return;
    if (cur.val === targetValue) {
      result.push(path.join(""));
      return;
    }
    path.push("L");
    getPath(cur.left, targetValue, path, result);
    path.pop();
    path.push("R");
    getPath(cur.right, targetValue, path, result);
    path.pop();
  }

  let startPath = [];
  let destPath = [];
  let tmpPath = [];

  // Find paths from root to startValue and destValue
  getPath(root, startValue, tmpPath, startPath);
  getPath(root, destValue, tmpPath, destPath);

  startPath = startPath[0];
  destPath = destPath[0];

  // Find the common prefix
  let i = 0;
  while (
    i < Math.min(startPath.length, destPath.length) &&
    startPath[i] === destPath[i]
  ) {
    i++;
  }

  // Return the result with 'U's for going up and remaining part of destPath
  return "U".repeat(startPath.length - i) + destPath.slice(i);
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
