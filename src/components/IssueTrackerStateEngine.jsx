import { useReducer, useEffect, useState } from "react";
import "../css/IssueTrackerStateEngine.css";

export const initialIssueState = {
  issues: [],
  filter: "all",
  nextId: 1,
};

export function issueReducer(state, action) {
  switch (action.type) {
    case "ADD_ISSUE": {
      if (!action.payload?.title?.trim()) return state;
      const newIssue = {
        id: state.nextId,
        title: action.payload.title.trim(),
        status: "open",
      };
      return {
        ...state,
        issues: [...state.issues, newIssue],
        nextId: state.nextId + 1,
      };
    }
    case "TOGGLE_ISSUE": {
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id
            ? { ...issue, status: issue.status === "open" ? "done" : "open" }
            : issue
        ),
      };
    }
    case "DELETE_ISSUE": {
      return {
        ...state,
        issues: state.issues.filter((issue) => issue.id !== action.payload.id),
      };
    }
    case "SET_FILTER": {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }
    case "CLEAR_DONE": {
      return {
        ...state,
        issues: state.issues.filter((issue) => issue.status !== "done"),
      };
    }
    default:
      return state;
  }
}

export function usePersistentReducer(reducer, defaultState, storageKey = "issue_tracker_state") {
  const [state, dispatch] = useReducer(reducer, defaultState, (initial) => {
    try {
      const persisted = localStorage.getItem(storageKey);
      return persisted ? JSON.parse(persisted) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (err) {
      console.error("Failed to persist state", err);
    }
  }, [state, storageKey]);

  return [state, dispatch];
}

export default function IssueTrackerStateEngine() {
  const [state, dispatch] = usePersistentReducer(issueReducer, initialIssueState);
  const [titleInput, setTitleInput] = useState("");

  const handleAddIssue = (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;
    dispatch({ type: "ADD_ISSUE", payload: { title: titleInput } });
    setTitleInput("");
  };

  const filteredIssues = state.issues.filter((issue) => {
    if (state.filter === "open") return issue.status === "open";
    if (state.filter === "done") return issue.status === "done";
    return true;
  });

  const allCount = state.issues.length;
  const openCount = state.issues.filter((i) => i.status === "open").length;
  const doneCount = state.issues.filter((i) => i.status === "done").length;

  return (
    <div className="issue-tracker-card">
      <h2 className="tracker-title">Issue Tracker State Engine</h2>

      <form className="issue-form" onSubmit={handleAddIssue}>
        <input
          type="text"
          value={titleInput}
          placeholder="New issue title..."
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <button type="submit">Add Issue</button>
      </form>

      <div className="filter-bar">
        <span className="filter-counts">
          All: {allCount} | Open: {openCount} | Done: {doneCount}
        </span>
        <div className="filter-actions">
          {["all", "open", "done"].map((mode) => (
            <button
              key={mode}
              className={`filter-btn ${state.filter === mode ? "active" : ""}`}
              onClick={() => dispatch({ type: "SET_FILTER", payload: { filter: mode } })}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
          <button
            className="btn-clear-done"
            onClick={() => dispatch({ type: "CLEAR_DONE" })}
            disabled={doneCount === 0}
          >
            Clear Done
          </button>
        </div>
      </div>

      <ul className="issue-list">
        {filteredIssues.map((issue) => (
          <li key={issue.id} className="issue-item">
            <span>
              <span className={`issue-status-${issue.status}`}>
                [{issue.status.toUpperCase()}]
              </span>{" "}
              #{issue.id}: {issue.title}
            </span>
            <div className="issue-actions">
              <button
                className="btn-toggle"
                onClick={() => dispatch({ type: "TOGGLE_ISSUE", payload: { id: issue.id } })}
              >
                Mark as {issue.status === "open" ? "Done" : "Open"}
              </button>
              <button
                className="btn-delete"
                onClick={() => dispatch({ type: "DELETE_ISSUE", payload: { id: issue.id } })}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}