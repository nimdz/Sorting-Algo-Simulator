import { useState, useEffect } from "react";
import "./App.css";
import { algorithms } from "./algorithms";

function App() {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [algorithm, setAlgorithm] = useState("Bubble");
  const [iterationCount, setIterationCount] = useState(0);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    const newArray = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setUserInput("");
    setIterationCount(0);
  };

  const handleSort = async () => {
    const getAnimations = algorithms[algorithm];
    const animations = getAnimations(array);
    await runAnimations(animations);
  };

  const handleUserInput = () => {
    const values = userInput
      .split(",")
      .map((val) => parseInt(val.trim()))
      .filter((val) => !isNaN(val));

    if (values.length > 0) {
      setArray(values);
      setIterationCount(0);
    }
  };

  const runAnimations = async (animations) => {
    const arr = [...array];
    const valueElems = document.getElementsByClassName("array-value");

    for (let i = 0; i < animations.length; i++) {
      const { type, indices } = animations[i];
      const [a, b] = indices;
      setIterationCount((prev) => prev + 1);

      if (type === "compare") {
        valueElems[a].style.backgroundColor = "#e91e63";
        valueElems[b].style.backgroundColor = "#e91e63";

        await new Promise((res) => setTimeout(res, 400));

        valueElems[a].style.backgroundColor = "#009688";
        valueElems[b].style.backgroundColor = "#009688";
      }

      if (type === "swap") {
        [arr[a], arr[b]] = [arr[b], arr[a]];
        setArray([...arr]);

        await new Promise((res) => setTimeout(res, 300));
      }
    }
  };

  return (
    <div className="app-container">
      <h1>Sorting Visualizer</h1>

      <div className="controls">
        <button onClick={generateNewArray}>Random Array</button>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter array: e.g., 5,3,8"
        />
        <button onClick={handleUserInput}>Set Array</button>

        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          {Object.keys(algorithms).map((algo) => (
            <option key={algo} value={algo}>
              {algo} Sort
            </option>
          ))}
        </select>

        <button onClick={handleSort}>Sort Now</button>
      </div>

      <div className="array-container">
        {array.map((value, index) => (
          <div key={index} className="array-value">
            {value}
          </div>
        ))}
      </div>

      <div className="info">
        <p>Algorithm: {algorithm} Sort</p>
        <p>Total Steps: {iterationCount}</p>
      </div>
    </div>
  );
}

export default App;
