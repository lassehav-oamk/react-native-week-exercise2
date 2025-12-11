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
- Username TextInput with `testID="text-input"`
- Password TextInput with `testID="password-input"` and `secureTextEntry={true}`
- Login Button with `testID="button"` and `title="Login"`

**Functionality:**
- When Login button is pressed:
  - Validate both username and password are not empty (trim whitespace)
  - Store username in AsyncStorage with key `'username'`
  - Navigate to WelcomeView using `navigation.reset()` to prevent back navigation
  - Use exact navigation pattern:
    ```javascript
    navigation.reset({
      index: 0,
      routes: [{ name: 'WelcomeView' }],
    });
    ```

### screens/WelcomeView.js Requirements

**Component Export:**
- Must export default a component named `WelcomeView`

**Props:**
- Must accept `{ navigation }` prop

**State Management:**
- Load `username` from AsyncStorage (key: `'username'`)
- Load `clickCount` from AsyncStorage (key: `'clickCount'`)
- Initialize clickCount to `0` if not found

**Display Requirements:**
- Must display text containing: `"Welcome {username}"` where {username} is the stored value
- Must display text containing: `"Click Count: {clickCount}"` where {clickCount} is the current counter value

**Navigation Buttons:**
- Button to navigate to `'ButtonIncrementView'`
- Button to navigate to `'ButtonDecrementView'`
- Button to navigate to `'SummaryView'`

### screens/ButtonIncrementView.js Requirements

**Component Export:**
- Must export default a component named `ButtonIncrementView`

**Props:**
- Must accept `{ navigation }` prop

**State Management:**
- Load `clickCount` from AsyncStorage (key: `'clickCount'`)
- Initialize to `0` if not found
- On component mount (useEffect), load the current count

**Display Requirements:**
- Display the current click count value

**Functionality:**
- Increment button that:
  - Increases clickCount by 1
  - Saves the new value to AsyncStorage (key: `'clickCount'`)
  - Updates local state to reflect the change

**Navigation:**
- Must provide a way to navigate back to WelcomeView

### screens/ButtonDecrementView.js Requirements

**Component Export:**
- Must export default a component named `ButtonDecrementView`

**Props:**
- Must accept `{ navigation }` prop

**State Management:**
- Load `clickCount` from AsyncStorage (key: `'clickCount'`)
- Initialize to `0` if not found
- On component mount (useEffect), load the current count

**Display Requirements:**
- Display the current click count value

**Functionality:**
- Decrement button that:
  - Decreases clickCount by 1
  - Saves the new value to AsyncStorage (key: `'clickCount'`)
  - Updates local state to reflect the change

**Navigation:**
- Must provide a way to navigate back to WelcomeView

### screens/SummaryView.js Requirements

**Component Export:**
- Must export default a component named `SummaryView`

**Props:**
- Must accept `{ navigation }` prop

**State Management:**
- Load `username` from AsyncStorage (key: `'username'`)
- Load `clickCount` from AsyncStorage (key: `'clickCount'`)
- Initialize clickCount to `0` if not found

**Display Requirements:**
- Display the username value
- Display the total click count value
- No buttons to modify the counter (read-only)

**Navigation:**
- Must provide a way to navigate back to WelcomeView

---

## AsyncStorage Key Reference

| Key | Type | Initial Value | Used In |
|-----|------|---------------|---------|
| `'username'` | string | (none) | Login (write), WelcomeView (read), SummaryView (read) |
| `'clickCount'` | string (number) | `'0'` | All counter screens (read/write) |

**Important:** AsyncStorage stores values as strings. When reading `clickCount`, parse it as an integer: `parseInt(storedCount) || 0`

## Implementation Guidelines

### State Management Strategy
- Use **AsyncStorage** (`@react-native-async-storage/async-storage`) to persist and share data
- The click counter must be synchronized across all screens through AsyncStorage
- Load data from AsyncStorage when components mount (using `useEffect`)
- Save data to AsyncStorage when values change
- Initialize counter at `0` if no stored value exists

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
2. **Case-sensitive naming** - Screen names, AsyncStorage keys, and testIDs must match exactly
3. **AsyncStorage is asynchronous** - Use async/await properly
4. **Parse stored numbers** - AsyncStorage returns strings, convert to numbers when needed
5. **Validation** - Check that username and password are not empty before login

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
- ✓ Username input exists with `testID="text-input"`
- ✓ Password input exists with `testID="password-input"` and has secureTextEntry
- ✓ Login button exists with `testID="button"` and `title="Login"`
- ✓ Clicking login with valid credentials stores username in AsyncStorage (key: 'username')
- ✓ Clicking login navigates to WelcomeView using navigation.reset()
- ✓ Empty username or password prevents login

### WelcomeView Screen Tests
- ✓ WelcomeView component renders without errors
- ✓ Displays "Welcome {username}" with username from AsyncStorage
- ✓ Displays click count from AsyncStorage
- ✓ Has navigation buttons to ButtonIncrementView, ButtonDecrementView, and SummaryView
- ✓ Cannot navigate back to Login screen

### Counter Functionality Tests
- ✓ ButtonIncrementView increments counter and saves to AsyncStorage
- ✓ ButtonDecrementView decrements counter and saves to AsyncStorage
- ✓ Counter state persists across screen navigation
- ✓ All screens read the same clickCount value from AsyncStorage
- ✓ Counter initializes to 0 if no stored value exists

### SummaryView Screen Tests
- ✓ SummaryView displays username from AsyncStorage
- ✓ SummaryView displays clickCount from AsyncStorage
- ✓ SummaryView has no counter modification buttons

### Data Persistence Tests
- ✓ AsyncStorage key 'username' is used correctly
- ✓ AsyncStorage key 'clickCount' is used correctly
- ✓ Counter value persists as a string in AsyncStorage
- ✓ parseInt is used when reading clickCount from AsyncStorage

---

## Submission

1. Complete the implementation following all requirements above
2. Ensure your code runs without errors
3. Test navigation between all screens
4. Verify the counter updates correctly across screens
5. Push your code to the GitHub Classroom repository
6. Automated tests will run on push


## Common Errors That Will Fail Tests

| Error | Impact | Fix |
|-------|--------|-----|
| Wrong screen name (e.g., 'LoginScreen' instead of 'Login') | Navigation tests fail | Use exact names from specifications |
| Wrong AsyncStorage key (e.g., 'user' instead of 'username') | Data persistence fails | Use exact keys: 'username', 'clickCount' |
| Missing testID on Login inputs | Login tests fail | Add testID="text-input" and testID="password-input" |
| Using navigation.navigate() instead of navigation.reset() in Login | Back navigation test fails | Use navigation.reset() pattern from specifications |
| Storing clickCount as number instead of string | AsyncStorage write fails | Convert to string: `newCount.toString()` |
| Not parsing clickCount when reading | Counter displays as string | Use `parseInt(storedCount) || 0` |
| Forgetting useEffect dependencies array | Infinite re-render | Add empty array `[]` to useEffect |
| Not handling null AsyncStorage values | App crashes | Use `storedValue || defaultValue` pattern |

---

## Resources

- [React Navigation Documentation](https://reactnavigation.org/)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [React Hooks Documentation](https://react.dev/reference/react)
- Install dependencies: `npm install` or `yarn install`

---

## Submission Checklist

Before pushing your code, verify:

- [ ] All 5 screen files exist in `screens/` folder with exact names
- [ ] App.js sets up NavigationContainer and Stack.Navigator
- [ ] Login screen has correct testIDs on all inputs and button
- [ ] navigation.reset() is used (not navigation.navigate()) when logging in
- [ ] AsyncStorage keys are exactly: 'username' and 'clickCount'
- [ ] Counter initializes to 0 when no stored value exists
- [ ] parseInt() is used when reading clickCount from AsyncStorage
- [ ] All screens can navigate back to WelcomeView (except Login)
- [ ] No console errors or warnings when running the app
- [ ] Tests pass locally before pushing
- [ ] Code is committed and pushed to GitHub Classroom repository

Good luck!