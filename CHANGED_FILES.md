# CargoMate – Unified User + B2B Dashboard Theme (2026-11-05)

## Changed files (4)

1. `frontend/src/cargomateDashboard/components/ModuleHero.jsx` – shared navy/blue intelligence header and display names.
2. `frontend/src/cargomateDashboard/pages/b2bDashboard/B2BDashboard.jsx` – header on all B2B sidebar modules except Import/Export (those already have their own header), chatbot full-height, and subscription screens.
3. `frontend/src/cargomateDashboard/pages/userDashboard/UserDashboard.jsx` – header on User sidebar modules (excluding full-height chatbot).
4. `frontend/src/cargomateDashboard/dashboard-global.css` – shared branded cards, tables, buttons, responsive padding and headers.

## Covered B2B sidebar modules
HS Code Intelligence, Shipment Database, HS Code Lookup, Incentive Checker, Freight Calculator, Shipment Planning, Risk Analysis, AI Insights, Shipment Operations Hub, Documents, Invoice Management, Reports, Notifications, Help & Support, Settings. Dashboard included. Import/Export Intelligence retains its native blue header to prevent duplication.

## Covered User sidebar modules
AI CargoMate Assistant, HS Code Lookup, Incentive Checker, Freight Calculator, Shipment Planning, Saved, Subscription, Notifications, Help & Support, and related tabs. Chatbot retains full-height layout.

## Installation
Copy the four changed files to matching paths in your frontend. No backend endpoint or DB schema changes are required for this UI-only request; the separate `backend(4).zip` is left unchanged. Restart Vite and check `npm run build`.

## Validation and limitations
Headers, layout wrappers, shared CSS are actual code modifications. Component-specific internal panels and forms remain structurally unchanged to preserve functionality. This is not a pixel-for-pixel redesign of every nested view. The CSS has been scoped to `.cm-workspace` so Admin UI is unaffected.
