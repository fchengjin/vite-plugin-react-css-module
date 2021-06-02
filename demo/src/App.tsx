import React, { useCallback, useState } from "react";
import "./App.module.less";

function App() {
  const [color, setColor] = useState<"blue" | "red">("blue");
  const handleToggle = useCallback(() => {
    setColor(color === "blue" ? "red" : "blue");
  }, [color]);
  return (
    <div styleName="app">
      <div
        onClick={handleToggle}
        styleName={color}
        className="global-classname"
      >
        toggle className
      </div>
    </div>
  );
}

export default App;
