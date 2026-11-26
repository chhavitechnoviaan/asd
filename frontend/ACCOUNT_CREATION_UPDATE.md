# Account creation / Partner UI update

User and Partner signup use the User model with Mongoose timestamps. `createdAt` is the persisted creation instant; no migration or client-supplied date is required. Existing records without a timestamp display an em dash. Admin date/time display uses Asia/Kolkata (IST). Internal b2b roles, vendor API routes and ad placement keys are retained. Native dialogs were converted to SweetAlert2; existing SweetAlert2 dialogs share the global blue theme. Existing inline errors and toast notifications remain.

Deployment: retain your existing .env (excluded from these archives), install dependencies with npm ci, build frontend with npm run build, deploy dist contents; restart backend if replacing it. Verify VITE_API_URL points to the working API host before building. No live database or browser tests were performed.
