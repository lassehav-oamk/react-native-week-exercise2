import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import WelcomeView from "../screens/WelcomeView";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn()
}));

const mockNavigate = jest.fn();

const mockNavigation = {
    navigate: mockNavigate
};

describe('WelcomeView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('displays username and click count from AsyncStorage', async () => {
        AsyncStorage.getItem.mockImplementation((key) => {
            if (key === 'username') return Promise.resolve('testuser');
            if (key === 'clickCount') return Promise.resolve('5');
        });

        const { getByText } = render(<WelcomeView navigation={mockNavigation} />);

        await waitFor(() => {
            expect(getByText('Welcome testuser')).toBeTruthy();
            expect(getByText('Click Count: 5')).toBeTruthy();
        });
    })

    it('navigates to Increment, Decrement and Summary screens', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce('testuser');
        AsyncStorage.getItem.mockResolvedValueOnce('5');

        const { getByText } = render(<WelcomeView navigation={mockNavigation} />);
        
        await waitFor(() => {
            fireEvent.press(getByText('Increment'));
            expect(mockNavigate).toHaveBeenCalledWith('ButtonIncrementView');

            fireEvent.press(getByText('Decrement'));
            expect(mockNavigate).toHaveBeenCalledWith('ButtonDecrementView');

            fireEvent.press(getByText('Summary'));
            expect(mockNavigate).toHaveBeenCalledWith('SummaryView');
        })
     })
})

