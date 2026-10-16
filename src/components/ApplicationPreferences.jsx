import { createContext, useContext, useState } from "react";
import "../css/ApplicationPreferences.css";

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(16);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const updateFontSize = (size) => {
    setFontSize(size);
  };

  return (
    <PreferencesContext.Provider value={{ theme, fontSize, toggleTheme, updateFontSize }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}

function PreferencesPanel() {
  const { theme, fontSize, toggleTheme, updateFontSize } = usePreferences();

  return (
    <div className="panel-section">
      <h4>Preferences Panel</h4>
      <button className="btn-theme-toggle" onClick={toggleTheme}>
        Toggle Theme (Current: {theme.toUpperCase()})
      </button>
      <div className="font-size-controls">
        <label>Font Size: </label>
        {[14, 16, 18].map((size) => (
          <button
            key={size}
            className={`btn-option ${fontSize === size ? "selected" : ""}`}
            onClick={() => updateFontSize(size)}
            disabled={fontSize === size}
          >
            {size}px
          </button>
        ))}
      </div>
    </div>
  );
}

function Toolbar() {
  return (
    <div>
      <PreferencesPanel />
    </div>
  );
}

function ArticlePreview() {
  const { theme, fontSize } = usePreferences();

  return (
    <div className="preview-section">
      <h3>Article Preview</h3>
      <p style={{ fontSize: `${fontSize}px` }}>
        Active Theme: <strong>{theme}</strong> | Active Font Size: <strong>{fontSize}px</strong>
      </p>
      <p style={{ fontSize: `${fontSize}px` }}>
        This preview component consumes theme and font size values directly from context without prop drilling.
      </p>
    </div>
  );
}

function Dashboard() {
  const { theme } = usePreferences();

  return (
    <div className={`app-prefs-container theme-${theme}`}>
      <div className="prefs-header">Application Preferences</div>
      <Toolbar />
      <ArticlePreview />
    </div>
  );
}

export default function ApplicationPreferences() {
  return (
    <PreferencesProvider>
      <Dashboard />
    </PreferencesProvider>
  );
}