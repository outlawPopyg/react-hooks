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