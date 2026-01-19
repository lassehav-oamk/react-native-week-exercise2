# React Native Navigation & Data Passing Exercise

## Overview

Build a multi-screen React Native application using React Navigation. The app will start with a login screen, navigate to a welcome screen, and include a shared click counter that can be accessed and modified across multiple screens.

You will practice:
- Screen navigation with React Navigation (Stack Navigator)
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

## Exact Technical Specifications

### File Structure (Required)
```
project-root/
├── App.js
├── screens/
│   ├── Login.js
│   ├── WelcomeView.js
│   ├── ButtonIncrementView.js
│   ├── ButtonDecrementView.js
│   └── SummaryView.js
```

### App.js Requirements
- Must use `NavigationContainer` from `@react-navigation/native`
- Must use `createNativeStackNavigator` from `@react-navigation/native-stack`
- Initial route name must be exactly: `'Login'`
- Screen names registered in Stack.Navigator must be exactly:
  - `'Login'` → Login component
  - `'WelcomeView'` → WelcomeView component
  - `'ButtonIncrementView'` → ButtonIncrementView component
  - `'ButtonDecrementView'` → ButtonDecrementView component
  - `'SummaryView'` → SummaryView component

### screens/Login.js Requirements

**Component Export:**
- Must export default a component named `Login`

**Props:**
- Must accept `{ navigation }` prop

**UI Elements (Required testIDs):**
- Username TextInput with `testID="username-input"`
- Password TextInput with `testID="password-input"` and `secureTextEntry={true}`
- Login Button with `testID="button"` and `title="Login"`

**Functionality:**
- When Login button is pressed:
  - Validate both username and password are not empty (trim whitespace)
  - Navigate to WelcomeView and pass the username to the next screen
  - Use `navigation.reset()` to prevent back navigation:
    ```javascript
    navigation.reset({
      index: 0,
      routes: [{ name: 'WelcomeView', params: { username: username } }],
    });
    ```

### screens/WelcomeView.js Requirements

**Component Export:**
- Must export default a component named `WelcomeView`

**Props:**
- Must accept `{ navigation, route }` prop

**Data Requirements:**
- Receive `username` from the previous screen
- Manage `clickCount` value (initialize to `0`)

**Display Requirements:**
- Must display text containing: `"Welcome {username}"` where {username} is the received value
- Must display text containing: `"Click Count: {clickCount}"` where {clickCount} is the current counter value

**Navigation Buttons:**
- Button to navigate to `'ButtonIncrementView'`
- Button to navigate to `'ButtonDecrementView'`
- Button to navigate to `'SummaryView'`

### screens/ButtonIncrementView.js Requirements

**Component Export:**
- Must export default a component named `ButtonIncrementView`

**Props:**
- Must accept `{ navigation }` prop (and `route` if using params)

**Data Requirements:**
- Access the current `clickCount` value

**Display Requirements:**
- Display the current click count value

**Functionality:**
- Increment button that increases clickCount by 1
- The updated count must be reflected when returning to WelcomeView

**Navigation:**
- Must provide a way to navigate back to WelcomeView

### screens/ButtonDecrementView.js Requirements

**Component Export:**
- Must export default a component named `ButtonDecrementView`

**Props:**
- Must accept `{ navigation }` prop (and `route` if using params)

**Data Requirements:**
- Access the current `clickCount` value

**Display Requirements:**
- Display the current click count value

**Functionality:**
- Decrement button that decreases clickCount by 1
- The updated count must be reflected when returning to WelcomeView

**Navigation:**
- Must provide a way to navigate back to WelcomeView

### screens/SummaryView.js Requirements

**Component Export:**
- Must export default a component named `SummaryView`

**Props:**
- Must accept `{ navigation }` prop (and `route` if using params)

**Data Requirements:**
- Access the `username` value
- Access the `clickCount` value

**Display Requirements:**
- Display the username value
- Display the total click count value
- No buttons to modify the counter (read-only)

**Navigation:**
- Must provide a way to navigate back to WelcomeView

---

## Data Passing Strategy

You may use **any method** to pass and share data between screens. Some options include:

1. **Navigation params** - Pass data via `navigation.navigate('ScreenName', { data })`
2. **React Context** - Create a context provider to share state globally
3. **State management libraries** - Use Redux, Zustand, or similar
4. **Lifting state up** - Manage state in App.js and pass via screen props

Choose the approach that works best for your implementation. The tests will verify that data is correctly passed and displayed, not the specific mechanism used.

---

## Implementation Guidelines

### Navigation Flow
```
Login (initial)
  ↓ (navigation.reset - no back)
WelcomeView
  ↓ ↑ (bidirectional navigation)
  ├─→ ButtonIncrementView
  ├─→ ButtonDecrementView
  └─→ SummaryView
```

### Critical Implementation Notes
1. **No back navigation from WelcomeView to Login** - Use `navigation.reset()` pattern shown in specifications
2. **Case-sensitive naming** - Screen names and testIDs must match exactly
3. **Validation** - Check that username and password are not empty before login
4. **Counter initialization** - The click counter should start at 0
5. **Data synchronization** - Counter changes in increment/decrement screens must be reflected in WelcomeView and SummaryView

---

## Automated Testing

This exercise will be **automatically tested** in GitHub Classroom. The autotests will verify:

### Navigation & Structure Tests
- ✓ App.js exports a valid React component
- ✓ NavigationContainer is properly configured
- ✓ All 5 screens are registered with exact names: Login, WelcomeView, ButtonIncrementView, ButtonDecrementView, SummaryView
- ✓ Initial route is set to 'Login'
- ✓ All screen components are properly exported from their files

### Login Screen Tests
- ✓ Login component renders without errors
- ✓ Username input exists with `testID="username-input"`
- ✓ Password input exists with `testID="password-input"` and has secureTextEntry
- ✓ Login button exists with `testID="button"` and `title="Login"`
- ✓ Clicking login with valid credentials navigates to WelcomeView
- ✓ Username is passed to the next screen
- ✓ Clicking login uses navigation.reset() to prevent back navigation
- ✓ Empty username or password prevents login

### WelcomeView Screen Tests
- ✓ WelcomeView component renders without errors
- ✓ Displays "Welcome {username}" with the passed username
- ✓ Displays click count value
- ✓ Has navigation buttons to ButtonIncrementView, ButtonDecrementView, and SummaryView
- ✓ Cannot navigate back to Login screen

### Counter Functionality Tests
- ✓ ButtonIncrementView increments counter
- ✓ ButtonDecrementView decrements counter
- ✓ Counter state is shared across screens
- ✓ Counter initializes to 0

### SummaryView Screen Tests
- ✓ SummaryView displays username
- ✓ SummaryView displays clickCount
- ✓ SummaryView has no counter modification buttons

---

## Submission

1. Complete the implementation following all requirements above
2. Ensure your code runs without errors
3. Test navigation between all screens
4. Verify the counter updates correctly across screens
5. Push your code to the GitHub Classroom repository
6. Automated tests will run on push



---

## Resources

- [React Navigation Documentation](https://reactnavigation.org/)
- [React Navigation - Passing Parameters](https://reactnavigation.org/docs/params/)
- [React Hooks Documentation](https://react.dev/reference/react)
- Install dependencies: `npm install` or `yarn install`

---

## Submission Checklist

Before pushing your code, verify:

- [ ] All 5 screen files exist in `screens/` folder with exact names
- [ ] App.js sets up NavigationContainer and Stack.Navigator
- [ ] Login screen has correct testIDs on all inputs and button
- [ ] navigation.reset() is used (not navigation.navigate()) when logging in
- [ ] Username is passed from Login to WelcomeView
- [ ] Counter initializes to 0
- [ ] Counter changes are reflected across all screens
- [ ] All screens can navigate back to WelcomeView (except Login)
- [ ] No console errors or warnings when running the app
- [ ] Tests pass locally before pushing
- [ ] Code is committed and pushed to GitHub Classroom repository

Good luck!
