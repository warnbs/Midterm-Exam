# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# React Practical Exams

## Completed Requirements
- **Exam 1 (Smart Task Counter):** `useState` implementation tracking count and target, non-negative decrement, reset, plus-two functional updates, derived status without extra state, and boundary disabled state[cite: 3].
- **Exam 2 (Live Search & Timer):** `useEffect` filter with simulated delay, search request cancellation (`clearTimeout`), 1-second interval timer with cleanup (`clearInterval`), and dynamic `document.title` synchronization[cite: 4].
- **Exam 3 (Accessible Form Toolkit):** Controlled inputs via `useState`, input focusing via `useRef`, validation for required name, email format, and 8-character password, and silent previous-submission email tracking[cite: 6].
- **Exam 4 (Application Preferences):** Shared `PreferencesContext` provider, direct consumption of theme and font size across three levels without prop drilling, dynamic theme toggling, and boundary checks in `usePreferences`[cite: 7].
- **Exam 5 (Product Explorer Performance Repair):** 600+ product records filtered/sorted with `useMemo`, callback memoized with `useCallback`, `React.memo` child isolation to prevent re-renders from unrelated parent counters[cite: 8].
- **Exam 6 (Issue Tracker State Engine):** Pure `useReducer` handling 5 immutable actions (`ADD_ISSUE`, `TOGGLE_ISSUE`, `DELETE_ISSUE`, `SET_FILTER`, `CLEAR_DONE`), safe default state fallback, and a custom `usePersistentReducer` using `localStorage`[cite: 9].

## Known Limitations
- Data for users and products are generated from static local arrays for offline evaluation[cite: 4, 8].
- State persistence in Exam 6 relies on browser `localStorage` availability and will fall back to in-memory defaults if storage access is restricted[cite: 9].

## Test Steps
1. **Exam 1:** Increment, decrement at 0 (verifies floor), click Plus Two at boundary, and reset to verify state transitions[cite: 3].
2. **Exam 2:** Type quickly in search to verify debouncing/cancellation; observe the second counter and check the browser tab title[cite: 4].
3. **Exam 3:** Click submit with empty fields to verify focus shifts to Name, enter invalid email/password to verify validation, and submit valid data to verify silent previous-email tracking[cite: 6].
4. **Exam 4:** Toggle theme and change font sizes (14px, 16px, 18px) to verify immediate updates in Dashboard and ArticlePreview[cite: 7].
5. **Exam 5:** Open browser console, click "Increment Unrelated Counter", and verify `ProductList` does not re-render[cite: 8].
6. **Exam 6:** Add an issue, mark it done, change filter views (All, Open, Done), clear completed, and refresh the browser to verify `localStorage` persistence[cite: 9].