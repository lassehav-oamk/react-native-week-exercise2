import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonIncrementView from '../screens/ButtonIncrementView';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));

const mockNavigate = jest.fn();

const mockNavigation = {
    navigate: mockNavigate
};

describe('ButtonIncrementView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('loads and displays initial click count', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce('4');

        const { getByText } = render(<ButtonIncrementView navigation={mockNavigation} />)

        await waitFor(() => {
            expect(getByText('Click Count: 4')).toBeTruthy();
        });
    });

    it('increments click count and updates AsyncStorage', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce('4');

        const { getByText } = render(<ButtonIncrementView navigation={mockNavigation} />)
        await waitFor(() => {
            fireEvent.press(getByText('Increment'))
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('clickCount', '1');
            expect(getByText('Click Count: 2')).toBeTruthy();
        });
    });

    it('navigates back to WelcomeView', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce('1');

        const { getByText } = render(<ButtonIncrementView navigation={mockNavigation} />)

        await waitFor(() => {
            fireEvent.press(getByText('Back to Welcome'));
            expect(mockNavigate).toHaveBeenCalledWith('WelcomeView');
        })
    })
})