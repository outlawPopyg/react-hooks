## 1 use case of useRef()
```js
import React, { useState, useEffect, useRef, forwardRef } from "react";

export default function App() {
    const headingRef = useRef('');
    const inputRef = useRef(null);

    useEffect(() => {
        // Manipulating with headingRef
        headingRef.current.style.fontStyle = 'italic';
        headingRef.current.innerHTML = "Changed h1 element";
        headingRef.current.parentNode.style.backgroundColor = "gold";

        // Manipulating with input
        inputRef.current.focus(); // focus on input elem when component mounts
    }, []);

    return (
        <div>
            <h1 ref={ headingRef }>This is a h1 element</h1>
            <NewInput val={"Forward ref example"} ref={ inputRef } />
        </div>
    );
}
// const NewInput = ({ val, ref }) => <input type="text" placeholder={val} ref={ref} /> так низяя!!!

const NewInput = // надо вот так!
    forwardRef((props, ref) => <input placeholder={props.val} ref={ref} type="text" />);
```