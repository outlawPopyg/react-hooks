## use case 1
useLayoutEffect делает тоже самое что и useEffect, но его лучше использовать при манипуляциях
с DOM'ом, так могут появляться проблемы с отрисовкой и производительностью
```js
import React, {useState, useEffect, useLayoutEffect} from "react";

export default function App() {
    const [ windowSize, setWindowSize ] = useState({ height: 0, width: 0 });

    useLayoutEffect(() => {
        const resizeWindow = () => setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth
        });

        window.addEventListener('resize', resizeWindow);

        return () => window.removeEventListener('resize', resizeWindow);
    }, []);

    return (
        <div>
            <p>width: { windowSize.width }</p>
            <p>height: { windowSize.height }</p>
        </div>
    );
}
```
В примере выше мы навешиваем обработчик события измененя размера окна когда компонент маунтится.

## 2 use case
```js
import React, {useRef, useState, useEffect, useLayoutEffect} from "react";

export default function App() {
    const paragraph = useRef(null);

    useLayoutEffect(() => {
        const { current } = paragraph;
        const blurredEffect = () => {
            current.style.color = "transparent";
            current.style.textShadow = "0 0 5px rgba(0,0,0,0.5)";
        };

        current.addEventListener("click", blurredEffect);
        return () => current.removeEventListener("click", blurredEffect);
    }, []);

    return (
        <div>
            <p ref={paragraph}>Click me to blur</p>
        </div>
    );
}
```