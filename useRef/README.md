## 1 use case
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

## 2 use case
```js
import React, { useState, useEffect, useRef, forwardRef } from "react";

// The following example will detect the number of times a button is clicked without re-rendering the component.
export default function App() {
    const [ state, setState ] = useState(0);
    const countRef = useRef(0);

    const increment = () => {
        countRef.current++;
        console.log(countRef);
    };

    console.log("render");

    return (
        <div>
            <button onClick={ () => setState(1) }>Set state</button>
            <button onClick={ increment }>Increment</button>
        </div>
    );
}
```