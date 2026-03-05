---
title: "Valid Palindrome"
date: "2026-02-23"
tags: ["leetcode", "javascript", "string", "easy"]
difficulty: "easy"
---

## Problem

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

## Example

```
Input: s = "A man, a plan, a canal: Panama"
Output: true

Input: s = "race a car"
Output: false
```

## Solution

### Approach: Two Pointers with Filtering

```javascript
var isPalindrome = function(s) {
    // Convert to lowercase and filter only alphanumeric
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
};
```

### Optimized Approach: Skip Invalid Characters

```javascript
var isPalindrome = function(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        while (left < right && !isAlphaNumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphaNumeric(s[right])) {
            right--;
        }
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
};

function isAlphaNumeric(c) {
    return /[a-zA-Z0-9]/.test(c);
}
```

## Complexity Analysis

- **Time Complexity**: O(n) where n is the length of the string
- **Space Complexity**: O(1) for the optimized approach, O(n) for the filtering approach