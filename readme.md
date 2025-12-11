# React Native Navigation & State Sharing Exercise

## Overview

Build a multi-screen React Native application using React Navigation. The app will start with a login screen, navigate to a welcome screen, and include a shared click counter that can be accessed and modified across multiple screens.

You will practice:
- Screen navigation with React Navigation
- Passing data between screens
- Managing shared state across the application
- Controlling navigation stack behavior

## Application Structure

Your app will consist of **five screens**:

1. **Login** - Initial screen for user authentication
2. **WelcomeView** - Main screen after login
3. **ButtonIncrementView** - Screen with increment functionality
4. **ButtonDecrementView** - Screen with decrement functionality
5. **SummaryView** - Screen displaying the counter summary

---

## Step-by-Step Instructions

### Step 1: Project Setup

1. Create a `screens/` folder in your project root to hold all screen components
2. Use `App.js` to:
   - Define your navigation stack
   - Manage shared state (click counter)
   - Set up the initial route

**Required dependencies:**
- `@react-navigation/native`
- `@react-navigation/native-stack`
- React Navigation peer dependencies

### Step 2: Login Screen (Login → WelcomeView)

**File:** `screens/Login.js`

Create the Login screen as the **initial screen** of your app.

**Requirements:**
- Two text input fields:
  - Username field
  - Password field
- One "Login" button
- When the button is pressed:
  - Save the username for use in the next screen
  - Navigate to WelcomeView
  - **Prevent the user from going back to Login using the back button** (use navigation reset or replace)

### Step 3: Welcome Screen (WelcomeView)

**File:** `screens/WelcomeView.js`

**Requirements:**
- Display: `"Welcome <username>"` where `<username>` is the value entered on the Login screen
- Display the current click count value
- Three navigation buttons:
  - Button to navigate to **ButtonIncrementView**
  - Button to navigate to **ButtonDecrementView**
  - Button to navigate to **SummaryView**

### Step 4: Counter Screens

Create three screens that share and display the same click counter state.

#### ButtonIncrementView

**File:** `screens/ButtonIncrementView.js`

**Requirements:**
- Display the current click count
- Include a button that **increments** the click count by 1
- Include a back button or allow hardware back button to return to WelcomeView

#### ButtonDecrementView

**File:** `screens/ButtonDecrementView.js`

**Requirements:**
- Display the current click count
- Include a button that **decrements** the click count by 1
- Include a back button or allow hardware back button to return to WelcomeView

#### SummaryView

**File:** `screens/SummaryView.js`

**Requirements:**
- Display the current click count (read-only, no buttons to modify it)
- Include a back button or allow hardware back button to return to WelcomeView

---

## Technical Requirements

### State Management
- The click counter must be **shared state** across all screens
- Changes to the counter in any screen must immediately reflect in all other screens
- Initialize the counter at `0`

### Navigation Behavior
- Login must be the initial route
- After login, users should **not** be able to go back to the Login screen
- All other screens (ButtonIncrementView, ButtonDecrementView, SummaryView) should allow navigation back to WelcomeView

### Component Structure
```
project-root/
├── App.js (navigation setup & state management)
├── screens/
│   ├── Login.js
│   ├── WelcomeView.js
│   ├── ButtonIncrementView.js
│   ├── ButtonDecrementView.js
│   └── SummaryView.js
├── package.json
└── readme.md
```

---

## Testing

This exercise will be **automatically tested** in GitHub Classroom. The autotests will verify:

1. All five screens are properly created and accessible
2. Login screen is the initial route
3. Username is correctly passed from Login to WelcomeView
4. Navigation prevents going back to Login after successful login
5. Click counter is shared and updates across all screens
6. Increment button correctly increases the counter
7. Decrement button correctly decreases the counter
8. All screens display the current counter value

**Important:** Make sure your screen components are named exactly as specified (Login, WelcomeView, ButtonIncrementView, ButtonDecrementView, SummaryView) and exported correctly.

---

## Submission

1. Complete the implementation following all requirements above
2. Ensure your code runs without errors
3. Test navigation between all screens
4. Verify the counter updates correctly across screens
5. Push your code to the GitHub Classroom repository
6. Automated tests will run on push

---

## Grading Criteria

- **Navigation Setup (20%):** Proper React Navigation implementation
- **Login Flow (20%):** Login screen with username passing and no-back navigation
- **State Management (30%):** Shared counter state across screens
- **Screen Implementation (30%):** All five screens implemented correctly with proper functionality

---

## Common Pitfalls to Avoid

- Forgetting to install React Navigation dependencies
- Not preventing back navigation from WelcomeView to Login
- Creating separate counter states in each screen instead of shared state
- Incorrect screen naming (names are case-sensitive)
- Not passing/using the username from Login to WelcomeView

---

## Need Help?

- Check React Navigation documentation: https://reactnavigation.org/
- Review React hooks documentation (useState, useContext) for state management
- Make sure all dependencies are properly installed with `npm install` or `yarn install`

Good luck!