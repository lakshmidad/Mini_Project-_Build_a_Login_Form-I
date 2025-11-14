# Feature Specification: Persistent Tasks (localStorage)

Project: Task Manager
Feature Type: Quick Win (High Impact, Low Effort)

Problem Statement:
Users lose their tasks when refreshing the page or closing the browser.

Goal:
Persist tasks locally so they remain available between sessions without server or signup.

User Story:
As a busy student, I want my tasks to be saved in my browser so that I don't lose them when I refresh or return later.

Acceptance Criteria:
- Tasks added are stored to localStorage.
- Toggling a task to done/undone updates storage.
- Deleting a task updates storage.
- Tasks reload automatically on page load.

Non-Goals:
- Multi-device sync.
- User accounts.

Technical Notes:
- Use localStorage key: tm_tasks_v1
- Data model: [{ text: string, done: boolean }]
- Update storage on add, toggle, delete.

Test Cases:
- Add three tasks -> reload -> all present.
- Toggle second task -> reload -> state persists.
- Delete first task -> reload -> remains deleted.
