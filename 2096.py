# 2096. Step-By-Step Directions From a Binary Tree Node to Another
# Definition for a binary tree node.
from typing import Optional, List

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def getDirections(self, root: Optional[TreeNode], startValue: int, destValue: int) -> str:
        def getPath(cur, targetValue, path, ans):
            if cur is None:
                return
            if cur.val == targetValue:
                ans.append(''.join(path))
            path.append('L')
            getPath(cur.left, targetValue, path, ans)
            path[-1] = 'R'
            getPath(cur.right, targetValue, path, ans)
            path.pop(-1)

        tmpPath = []
        startPath = []
        destPath = []
        getPath(root, startValue, tmpPath, startPath)
        getPath(root, destValue, tmpPath, destPath)
        startPath = startPath[0]
        destPath = destPath[0]

        i = 0
        while i < min(len(startPath), len(destPath)) and startPath[i] == destPath[i]:
            i += 1
        return 'U' * (len(startPath) - i) + destPath[i:]

def build_tree(values: List[Optional[int]]) -> Optional[TreeNode]:
    if not values:
        return None
    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while i < len(values):
        current = queue.pop(0)
        if values[i] is not None:
            current.left = TreeNode(values[i])
            queue.append(current.left)
        i += 1
        if i < len(values) and values[i] is not None:
            current.right = TreeNode(values[i])
            queue.append(current.right)
        i += 1
    return root

# Example binary tree
#     5
#    / \
#   1   2
#  /   / \
# 3   6   4

values = [5, 1, 2, 3, None, 6, 4]
root = build_tree(values)

# Create an instance of the Solution class
solution = Solution()

# Test case 1: Path from node 3 to node 6
startValue = 3
destValue = 6
result = solution.getDirections(root, startValue, destValue)
print(f"Path from {startValue} to {destValue}: {result}")  # Expected: "UURL"

# Test case 2: Path from node 6 to node 4
startValue = 6
destValue = 4
result = solution.getDirections(root, startValue, destValue)
print(f"Path from {startValue} to {destValue}: {result}")  # Expected: "UR"

# Add more test cases as needed
