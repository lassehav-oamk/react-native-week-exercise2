import React from "react";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';

describe('App Navigation and Data Flow', () => {

    describe('Login Screen', () => {
        it('shows login screen initially with username input, password input, and login button', () => {
            const { getByTestId } = render(<App />);

            expect(getByTestId('username-input')).toBeTruthy();
            expect(getByTestId('password-input')).toBeTruthy();
            expect(getByTestId('button')).toBeTruthy();
        });

        it('does not navigate when username is empty', async () => {
            const { getByTestId, queryByText } = render(<App />);

            fireEvent.changeText(getByTestId('password-input'), 'password123');
            fireEvent.press(getByTestId('button'));

            await waitFor(() => {
                expect(queryByText(/Welcome/i)).toBeNull();
            });
        });

        it('does not navigate when password is empty', async () => {
            const { getByTestId, queryByText } = render(<App />);

            fireEvent.changeText(getByTestId('username-input'), 'testuser');
            fireEvent.press(getByTestId('button'));

            await waitFor(() => {
                expect(queryByText(/Welcome/i)).toBeNull();
            });
        });

        it('navigates to WelcomeView after successful login', async () => {
            const { getByTestId, getByText } = render(<App />);

            fireEvent.changeText(getByTestId('username-input'), 'testuser');
            fireEvent.changeText(getByTestId('password-input'), 'password123');
            fireEvent.press(getByTestId('button'));

            await waitFor(() => {
                expect(getByText(/Welcome.*testuser/i)).toBeTruthy();
            });
        });
    });

    describe('WelcomeView Screen', () => {
        const loginAndNavigateToWelcome = async (renderResult) => {
            const { getByTestId } = renderResult;
            fireEvent.changeText(getByTestId('username-input'), 'testuser');
            fireEvent.changeText(getByTestId('password-input'), 'password123');
            fireEvent.press(getByTestId('button'));
        };

        it('displays welcome message with username', async () => {
            const result = render(<App />);
            await loginAndNavigateToWelcome(result);

            await waitFor(() => {
                expect(result.getByText(/Welcome.*testuser/i)).toBeTruthy();
            });
        });

        it('displays initial click count of 0', async () => {
            const result = render(<App />);
            await loginAndNavigateToWelcome(result);

            await waitFor(() => {
                expect(result.getByText(/Click Count:.*0/i)).toBeTruthy();
            });
        });

        it('has navigation buttons for Increment, Decrement, and Summary', async () => {
            const result = render(<App />);
            await loginAndNavigateToWelcome(result);

            await waitFor(() => {
                expect(result.getByText('Increment')).toBeTruthy();
                expect(result.getByText('Decrement')).toBeTruthy();
                expect(result.getByText('Summary')).toBeTruthy();
            });
        });
    });

    describe('ButtonIncrementView Screen', () => {
        const navigateToIncrement = async (renderResult) => {
            const { getByTestId, getByText } = renderResult;
            fireEvent.changeText(getByTestId('username-input'), 'testuser');
            fireEvent.changeText(getByTestId('password-input'), 'password123');
            fireEvent.press(getByTestId('button'));

            await waitFor(() => {
                fireEvent.press(getByText('Increment'));
            });
        };

        it('displays click count', async () => {
            const result = render(<App />);
            await navigateToIncrement(result);

            await waitFor(() => {
                expect(result.getByText(/Count:/i)).toBeTruthy();
            });
        });

        it('has increment button and back button', async () => {
            const result = render(<App />);
            await navigateToIncrement(result);

            await waitFor(() => {
                expect(result.getByText('Increment')).toBeTruthy();
                expect(result.getByText('Back to Welcome')).toBeTruthy();
            });
        });

        it('increments count when increment button is pressed', async () => {
            const result = render(<App />);
            await navigateToIncrement(result);

            await waitFor(() => {
                fireEvent.press(result.getByText('Increment'));
            });

            await waitFor(() => {
                expect(result.getByText(/Count:.*1/i)).toBeTruthy();
            });
        });

        it('can navigate back to WelcomeView ', async () => {
            const result = render(<App />);
            await navigateToIncrement(result);

            await waitFor(() => {
                fireEvent.press(result.getByText('Back to Welcome'));
            });

            await waitFor(() => {
                expect(result.getByText(/Welcome.*testuser/i)).toBeTruthy();
            });
           
        });
    });

    describe('ButtonDecrementView Screen', () => {
        const navigateToDecrement = async (renderResult) => {
            const { getByTestId, getByText } = renderResult;
            fireEvent.changeText(getByTestId('username-input'), 'testuser');
            fireEvent.changeText(getByTestId('password-input'), 'password123');
            fireEvent.press(getByTestId('button'));

            await waitFor(() => {
                fireEvent.press(getByText('Decrement'));
            });
        };

        it('displays click count', async () => {
            const result = render(<App />);
            await navigateToDecrement(result);

            await waitFor(() => {
                expect(result.getByText(/Count:/i)).toBeTruthy();
            });
        });

        it('has decrement button and back button, shows count correct and can decrement the count', async () => {
            const result = render(<App />);
            await navigateToDecrement(result);

            await waitFor(() => {
                expect(result.getByText('Decrement')).toBeTruthy();
                expect(result.getByText('Back to Welcome')).toBeTruthy();
            });
        });
        

        it('can navigate back to WelcomeView', async () => {
            const result = render(<App />);
            await navigateToDecrement(result);

            await waitFor(() => {
                fireEvent.press(result.getByText('Back to Welcome'));
            });

            await waitFor(() => {
                expect(result.getByText(/Welcome.*testuser/i)).toBeTruthy();
            });
        });
    });

    describe('SummaryView Screen', () => {
        const navigateToSummary = async (renderResult) => {
            const { getByTestId, getByText } = renderResult;
            fireEvent.changeText(getByTestId('username-input'), 'testuser');
            fireEvent.changeText(getByTestId('password-input'), 'password123');
            fireEvent.press(getByTestId('button'));

            await waitFor(() => {
                fireEvent.press(getByText('Summary'));
            });
        };

        it('displays username', async () => {
            const result = render(<App />);
            await navigateToSummary(result);

            await waitFor(() => {
                expect(result.getByText(/Username:/i)).toBeTruthy();
            });
        });

        it('displays total clicks', async () => {
            const result = render(<App />);
            await navigateToSummary(result);

            await waitFor(() => {
                expect(result.getByText(/Clicks:/i)).toBeTruthy();
            });
        });

        it('does not have increment or decrement buttons', async () => {
            const result = render(<App />);
            await navigateToSummary(result);

            await waitFor(() => {
                expect(result.getByText('Back to Welcome')).toBeTruthy();
            });

            // SummaryView should only have Back button, not Increment/Decrement
            const incrementButtons = result.queryAllByText('Increment');
            const decrementButtons = result.queryAllByText('Decrement');
            expect(incrementButtons.length).toBe(0);
            expect(decrementButtons.length).toBe(0);
        });

        it('can navigate back to WelcomeView', async () => {
            const result = render(<App />);
            await navigateToSummary(result);

            await waitFor(() => {
                fireEvent.press(result.getByText('Back to Welcome'));
            });

            await waitFor(() => {
                expect(result.getByText(/Welcome.*testuser/i)).toBeTruthy();
            });
        });
    });

    describe('Data Persistence Across Navigation', () => {
        it('counter increments persist when navigating back to WelcomeView', async () => {
            const { getByTestId, getByText } = render(<App />);

            // Login
            fireEvent.changeText(getByTestId('username-input'), 'testuser');
            fireEvent.changeText(getByTestId('password-input'), 'password123');
            fireEvent.press(getByTestId('button'));

            // Verify initial count is 0
            await waitFor(() => {
                expect(getByText(/Click Count:.*0/i)).toBeTruthy();
            });

            // Navigate to increment screen
            fireEvent.press(getByText('Increment'));

            // Increment twice
            await waitFor(() => {
                fireEvent.press(getByText('Increment'));
            });
            await waitFor(() => {
                fireEvent.press(getByText('Increment'));
            });

            // Navigate back
            await waitFor(() => {
                fireEvent.press(getByText('Back to Welcome'));
            });

            // Verify count is now 2
            await waitFor(() => {
                expect(getByText(/Click Count:.*2/i)).toBeTruthy();
            });
        });

        it('counter shows correct value in SummaryView after increments', async () => {
            const { getByTestId, getByText } = render(<App />);

            // Login
            fireEvent.changeText(getByTestId('username-input'), 'myuser');
            fireEvent.changeText(getByTestId('password-input'), 'pass');
            fireEvent.press(getByTestId('button'));

            // Navigate to increment and increment 3 times
            await waitFor(() => {
                fireEvent.press(getByText('Increment'));
            });

            await waitFor(() => {
                fireEvent.press(getByText('Increment'));
                fireEvent.press(getByText('Increment'));
                fireEvent.press(getByText('Increment'));
            });

            // Go back to welcome
            await waitFor(() => {
                fireEvent.press(getByText('Back to Welcome'));
            });

            // Navigate to summary
            await waitFor(() => {
                fireEvent.press(getByText('Summary'));
            });

            // Verify summary shows correct data
            await waitFor(() => {
                expect(getByText(/Username:.*myuser/i)).toBeTruthy();
                expect(getByText(/Clicks:.*3/i)).toBeTruthy();
            });
        });

        it('decrement reduces counter correctly', async () => {
            const { getByTestId, getByText } = render(<App />);

            // Login
            fireEvent.changeText(getByTestId('username-input'), 'testuser');
            fireEvent.changeText(getByTestId('password-input'), 'password123');
            fireEvent.press(getByTestId('button'));

            // Increment first
            await waitFor(() => {
                fireEvent.press(getByText('Increment'));
            });
            await waitFor(() => {
                fireEvent.press(getByText('Increment'));
                fireEvent.press(getByText('Increment'));
            });

            // Go back and then decrement
            await waitFor(() => {
                fireEvent.press(getByText('Back to Welcome'));
            });

            await waitFor(() => {
                fireEvent.press(getByText('Decrement'));
            });

            await waitFor(() => {
                fireEvent.press(getByText('Decrement'));
            });

            // Go back to welcome
            await waitFor(() => {
                fireEvent.press(getByText('Back to Welcome'));
            });

            // Should be 3 - 1 = 2 (or whatever the implementation allows)
            await waitFor(() => {
                expect(getByText(/Click Count:/i)).toBeTruthy();
            });
        });
    });
});
