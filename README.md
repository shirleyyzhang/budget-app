# Budget Tracker

A simple browser-based app for tracking monthly expenses, built to brush up my HTML, CSS, and JavaScript skills and (bonus:) track my spending. Users can:

- Set a monthly budget
- Add/delete personal and monthly (essential) expense entries
- See updated remaining budget in real time
    - Note: budget is deducted with entries filtered to the current month
- Reset all entries or budget amount at any time

## Setup

1. Clone or download the repository
2. Open `index.html` in your browser.

Just a simple browser app - No server or build tools required 

## Usage
### 1. Set Your Budget
- Submit a number in the **"Enter your desired monthly budget"** field.
- Once set, the main app appears.

### 2. Add a New Entry
- Fill out the entry form:
  - **Description** (e.g., "Groceries")
  - **Amount** (e.g., 45.99)
  - **Type**: choose either "Personal" or "Monthly Expense"
- The entry will be added to the appropriate table, and the "Amount Left" will update (with only spendings in the current month. Entries that were not made in the month are shown but not deducted from budget).

### 3. Delete Entry
- Click the 🗑️ icon next to any entry to delete that entry.

### 4. Delete All Entries
- Double-click **"DELETE ALL"** button to remove all saved entries when resetting for a new month.

### 5. Reset Everything
- Double-click **"RESET BUDGET"** button at the top-right to:
  - Clear the set budget
  - Return to the budget input screen
