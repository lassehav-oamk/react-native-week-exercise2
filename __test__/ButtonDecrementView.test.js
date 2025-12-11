import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonDecrementView from '../screens/ButtonDecrementView';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));

const mockNavigate = jest.fn();

const mockNavigation = {
    navigate: mockNavigate
};

describe('ButtonDecrementView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('loads and displays initial click count', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce('4');

        const { getByText } = render(<ButtonDecrementView navigation={mockNavigation} />)

        await waitFor(() => {
            expect(getByText('Current Count: 4')).toBeTruthy();
        });
    });

    it('Decrements click count and updates AsyncStorage', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce('1');

        const { getByText } = render(<ButtonDecrementView navigation={mockNavigation} />)
        await waitFor(() => {
            fireEvent.press(getByText('Decrement'));
        });

        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('clickCount', '0');
            expect(getByText('Current Count: 0')).toBeTruthy();
        });
    });

    it('does not decrement below 0', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce('0');

        const { getByText } = render(<ButtonDecrementView navigation={mockNavigation} />)
        await waitFor(() => {
            fireEvent.press(getByText('Decrement'));
            expect(getByText('Current Count: 0')).toBeTruthy();
        });
    });

    it('navigates back to WelcomeView', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce('1');

        const { getByText } = render(<ButtonDecrementView navigation={mockNavigation} />)

        await waitFor(() => {
            fireEvent.press(getByText('Back to Welcome'));
            expect(mockNavigate).toHaveBeenCalledWith('WelcomeView');
        });
    });
});