---
title: "Reverse String"
date: "2026-02-22"
tags: ["leetcode", "javascript", "string", "easy"]
difficulty: "easy"
---

## Problem

Write a function that reverses a string. The input string is given as an array of characters `s`.

You must do this by modifying the input array in-place with O(1) extra memory.

## Example

```
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

## Solution

### Approach 1: Two Pointers

```javascript
var reverseString = function(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Swap
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    
    return s;
};
```

### Approach 2: Using JavaScript Array Methods

```javascript
var reverseString = function(s) {
    s.reverse();
};
```

## Complexity Analysis

- **Time Complexity**: O(n) where n is the length of the string
- **Space Complexity**: O(1) if we don't count the output array

The two-pointer approach is the most efficient and demonstrates core algorithm concepts!