import React, { useState } from "react";
import "../css/SmartTaskCounter.css";

export default function SmartTaskCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(5);

  let statusMessage = "In progress";
  let statusClass = "status-in-progress";

  if (count === 0) {
    statusMessage = "Not started";
    statusClass = "status-not-started";
  } else if (count >= target) {
    statusMessage = "Target reached";
    statusClass = "status-target-reached";
  }

  const isTargetReached = count >= target;

  const handleIncrement = () => {
    if (!isTargetReached) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleAddTwo = () => {
    if (!isTargetReached) {
      setCount((prev) => Math.min(prev + 1, target));
      setCount((prev) => Math.min(prev + 1, target));
    }
  };

  return (
    <div className="task-counter-card">
      <h2 className="task-counter-title">Smart Task Counter</h2>

      <div className="target-input-group">
        <label htmlFor="target-input">Target Tasks:</label>
        <input
          id="target-input"
          type="number"
          min="1"
          value={target}
          onChange={(e) => setTarget(Math.max(1, Number(e.target.value)))}
        />
      </div>

      <div className="metrics-container">
        <p>
          <strong>Completed Tasks:</strong> {count} / {target}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status-badge ${statusClass}`}>{statusMessage}</span>
        </p>
      </div>

      <div className="button-group">
        <button onClick={handleIncrement} disabled={isTargetReached}>
          Increment (+1)
        </button>

        <button onClick={handleAddTwo} disabled={isTargetReached}>
          Plus Two (+2)
        </button>

        <button onClick={handleDecrement} disabled={count === 0}>
          Decrement (-1)
        </button>

        <button onClick={handleReset} className="btn-reset">
          Reset
        </button>
      </div>
    </div>
  );
}