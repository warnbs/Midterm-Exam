import { useState } from "react";
import "./css/App.css";

import SmartTaskCounter from "./components/SmartTaskCounter";
import LiveSearchAndTimer from "./components/LiveSearchAndTimer";
import AccessibleFormToolkit from "./components/AccessibleFormToolkit";
import ApplicationPreferences from "./components/ApplicationPreferences";
import ProductExplorerPerformanceRepair from "./components/ProductExplorerPerformanceRepair";
import IssueTrackerStateEngine from "./components/IssueTrackerStateEngine";

export default function App() {
  const [activeTab, setActiveTab] = useState("exam1");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Midterm Practical Exam</h1>
      </header>

      <nav className="nav-bar">
        <button
          className={`nav-btn ${activeTab === "exam1" ? "active" : ""}`}
          onClick={() => setActiveTab("exam1")}
        >
          Exam 1: Task Counter
        </button>
        <button
          className={`nav-btn ${activeTab === "exam2" ? "active" : ""}`}
          onClick={() => setActiveTab("exam2")}
        >
          Exam 2: Live Search & Timer
        </button>
        <button
          className={`nav-btn ${activeTab === "exam3" ? "active" : ""}`}
          onClick={() => setActiveTab("exam3")}
        >
          Exam 3: Accessible Form Toolkit
        </button>
        <button
          className={`nav-btn ${activeTab === "exam4" ? "active" : ""}`}
          onClick={() => setActiveTab("exam4")}
        >
          Exam 4: Application Preferences
        </button>
        <button
          className={`nav-btn ${activeTab === "exam5" ? "active" : ""}`}
          onClick={() => setActiveTab("exam5")}
        >
          Exam 5: Product Explorer Performance Repair
        </button>
        <button
          className={`nav-btn ${activeTab === "exam6" ? "active" : ""}`}
          onClick={() => setActiveTab("exam6")}
        >
          Exam 6: Issue Tracker State Engine
        </button>
      </nav>

      <main className="content-stage">
        {activeTab === "exam1" && <SmartTaskCounter />}
        {activeTab === "exam2" && <LiveSearchAndTimer />}
        {activeTab === "exam3" && <AccessibleFormToolkit />}
        {activeTab === "exam4" && <ApplicationPreferences />}
        {activeTab === "exam5" && <ProductExplorerPerformanceRepair />}
        {activeTab === "exam6" && <IssueTrackerStateEngine />}
      </main>
    </div>
  );
}