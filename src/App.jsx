import { useState, useEffect } from "react";
import "./App.css";
import { getBubbleSortAnimations } from "./algorithms/bubblesort";

function App() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    const newArray = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
  };

  const handleBubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
    runAnimations(animations);
  };
  const runAnimations = (animations) => {
    const arr = [...array];
    const valueElems = document.getElementsByClassName("array-value");

    animations.forEach((animation, i) => {
      const delay = i * 500;
      const [a, b] = animation.indices;

      setTimeout(() => {
        if (animation.type === "compare") {
          valueElems[a].style.backgroundColor = "red";
          valueElems[b].style.backgroundColor = "red";

          setTimeout(() => {
            valueElems[a].style.backgroundColor = "teal";
            valueElems[b].style.backgroundColor = "teal";
          }, 300);
        }

        if (animation.type === "swap") {
          [arr[a], arr[b]] = [arr[b], arr[a]];
          setArray([...arr]);
        }
      }, delay);
    });
  };

  return (
    <div className="App">
      <h1>Sorting Algorithm Simulator</h1>
      <div className="buttons">
        <button onClick={generateNewArray}>Generate New Array</button>
        <button onClick={handleBubbleSort}>Bubble Sort</button>
      </div>
      <div className="array-container">
        {array.map((value, index) => (
          <div key={index} className="array-value">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
