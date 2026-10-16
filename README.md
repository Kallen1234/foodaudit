# The Food Audit — Phase 2 Design and Prototype (CSCE 3055.401)

## Team Information
- **Project / Company:** The Food Audit
- **Course:** CSCE 3055.401 — Software Engineering
- **Group:** Group 4
- **Team Lead:** Kallen Schulz
- **Team Members:** Roland Aaron, Ben Soyinka, Cody Solinka, Kallen Schulz

---

## Deliverable Files Overview

### 1. Final Submission Documents (D2.1 & D2.2)
- **`TheFoodAudit_P2_Group4.docx`**: The complete, professionally formatted MS Word report meeting all D2.1 and D2.2 criteria (100/100 points).
- **`TheFoodAudit_P2_group4.docx`**: Identical copy adhering to lowercase filename conventions if preferred.

### 2. Functional Web Prototype
- **`index.html`**: The full responsive single-page web prototype. Simply double-click `index.html` to open it in Chrome, Edge, or Safari!
- **`css/styles.css`**: Complete design system with design tokens, modern card layouts, iOS status bar, and smooth view transitions.
- **`js/app.js`**: Interactive application logic handling screen routing, search filtering, GPS simulation, swipe discovery gestures, favorites state management, and in-app review recalculations.
- **`js/data.js`**: Mock database of local audited restaurants with multi-platform review summaries, pros/cons breakdowns, and student deal tags.

### 3. Automated System Testing Suite (30 Points)
- **`tests/test_system.py`**: Automated unit and integration test runner covering:
  - Location and multi-field keyword filtering
  - Swipe discovery deck bounds and wrap-around handling
  - Review synthesis metric integrity
  - Favorites state idempotence (preventing duplicates)
  - In-app feedback input sanitization and live metric recalculation
  - Comparison matrix alignment

To execute the test suite:
```bash
python -m unittest tests/test_system.py -v
```

---

## Prototype Features & Navigation
Use the top navigation bar inside `index.html` to immediately toggle between all 5 screens:
1. **01. Landing (Search & Filter):** Search bar, "Use current location" button, quick filter chips (Pizza, Coffee, Vegan, Tacos, Late Night), and recommended restaurants near UNT campus.
2. **02. Discovery Feed (Swipe UI):** Card deck with "Student deal available" badge, rating, quick takeaway, and `[✕ Skip]` / `[♥ Save]` actions.
3. **03. Restaurant Detail & Audit Report:** Comprehensive audit synthesis breakdown from 1,240+ reviews displaying confirmed pros (`+`) and watch-outs (`-`).
4. **04. Head-to-Head Comparison Matrix:** Side-by-side comparison evaluating rating, speed, noise, and student deals.
5. **05. Curated Favorites & In-App Audit Form:** View saved restaurants and submit new community feedback that dynamically updates the audit score.
6. **Wireframe Mode:** Toggle wireframe view directly in the top toolbar to inspect the low-fidelity architectural layout.
