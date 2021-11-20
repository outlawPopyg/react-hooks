import React, { useState, useContext } from "react";
import FontSizeContext from "./context";

export default function App() {
  const [size, setSize] = useState(16);

  return (
    <FontSizeContext.Provider value={size}>
      <PageOne />
      <PageTwo />
      <button onClick={() => setSize((prevSize) => prevSize + 5)}>
        Increase font
      </button>
      <button onClick={() => setSize((prevSize) => Math.max(11, prevSize - 5))}>
        Decrease font
      </button>
    </FontSizeContext.Provider>
  );
}

const PageOne = () => {
  const fontSize = useContext(FontSizeContext);
  return (
    <p style={{ fontSize: `${fontSize}px` }}>Content from the first page</p>
  );
};

const PageTwo = () => {
  const fontSize = useContext(FontSizeContext);
  return (
    <p style={{ fontSize: `${fontSize}px` }}>Content from the second page</p>
  );
};
