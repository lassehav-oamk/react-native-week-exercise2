import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from '../screens/Login';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn()
}));

const mockReset = jest.fn();

const mockNavigation = {
    reset: mockReset,
};

describe('Login screen component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('saves username and navigates to WelcomeView with valid input', async () => {
        const { getByTestId } = render(<Login navigation={mockNavigation} />);

        const usernameInput = getByTestId('text-input');
        const passwordInput = getByTestId('password-input');
        const loginButton = getByTestId('button');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('username', 'testuser');
            expect(mockReset).toHaveBeenCalledWith({
                index: 0,
                routes: [{ name: 'WelcomeView' }],
            })
        })
    })

    it('does not navigate to WelcomeView with invalid input', async () => {
        const { getByTestId } = render(<Login navigation={mockNavigation} />);

        const usernameInput = getByTestId('text-input');
        const passwordInput = getByTestId('password-input');
        const loginButton = getByTestId('button');

        fireEvent.changeText(usernameInput, ''); // Empty username
        fireEvent.changeText(passwordInput, ''); // Empty password
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(AsyncStorage.setItem).not.toHaveBeenCalled();
            expect(mockReset).not.toHaveBeenCalled();
        });
    });

    it('does not navigate to WelcomeView if username is empty', async () => {
        const { getByTestId } = render(<Login navigation={mockNavigation} />);

        const usernameInput = getByTestId('text-input');
        const passwordInput = getByTestId('password-input');
        const loginButton = getByTestId('button');

        fireEvent.changeText(usernameInput, ''); // Empty username
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(AsyncStorage.setItem).not.toHaveBeenCalled();
            expect(mockReset).not.toHaveBeenCalled();
        });
    });

    it('does not navigate to WelcomeView if password is empty', async () => {
        const { getByTestId } = render(<Login navigation={mockNavigation} />);

        const usernameInput = getByTestId('text-input');
        const passwordInput = getByTestId('password-input');
        const loginButton = getByTestId('button');

        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, ''); // Empty password
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(AsyncStorage.setItem).not.toHaveBeenCalled();
            expect(mockReset).not.toHaveBeenCalled();
        });
    });
});