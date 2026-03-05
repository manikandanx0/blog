---
title: "A Beginner's Guide to React Hooks"
date: "2026-02-25"
tags: ["react", "javascript", "hooks", "tutorial"]
---

React Hooks changed the way we write functional components. In this post, I'll walk through the most commonly used hooks and practical examples.

## What are Hooks?

Hooks let you "hook into" React features from function components. They make it easier to reuse stateful logic without having to change your component hierarchy.

## useState Hook

The `useState` hook lets you add state to functional components:

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## useEffect Hook

The `useEffect` hook lets you perform side effects in functional components:

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

## Custom Hooks

You can also create your own hooks to share logic between components:

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return { count, increment, decrement };
}
```

Hooks are powerful and flexible. Start with `useState` and `useEffect`, then explore others as needed!
