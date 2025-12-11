import React from "react";
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import SummaryView from "../screens/SummaryView";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn()
}));

const mockNavigate = jest.fn();

describe('SummaryView', () => {
    beforeEach(() => {
        AsyncStorage.getItem.mockImplementation((key) => {
            if (key === 'username') return Promise.resolve('Joona');
            if (key === 'clickCount') return Promise.resolve('5');
            return Promise.resolve(null);
        });
    });

    it('renders username and click count from AsyncStorage', async () => {
        const { getByText } = render(<SummaryView navigation={{ navigate: mockNavigate }} />);
        
        await waitFor(() => {
            expect(getByText('Username: Joona')).toBeTruthy();
            expect(getByText('Total Clicks: 5')).toBeTruthy();
        });
    });

    it('navigates to WelcomeView on button press', async () => {
        const { getByText } = render(<SummaryView navigation={{ navigate: mockNavigate }} />);

        const button = getByText('Back to Welcome');
        fireEvent.press(button);

        expect(mockNavigate).toHaveBeenCalledWith('WelcomeView');
    });
});
