import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrderPages from '../pages/OrderPages';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);


describe('OrderPages', () => {
    test('displays correct order ID', () => {
        const orderId = 1;
        const order = {
            orderId,
            orderDate: '2023-06-13',
            status: 'Pending',
            orderItems: [],
        };

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} />
            </Provider>
        );

        expect(screen.getByText(`Order ID: ${orderId}`)).toBeInTheDocument();
    });

    test('displays correct order date', () => {
        const orderDate = '2023-06-13';
        const order = {
            orderId: 1,
            orderDate,
            status: 'Pending',
            orderItems: [],
        };

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} />
            </Provider>
        );

        expect(screen.getByText(`Order Date: ${orderDate}`)).toBeInTheDocument();
    });

    test('displays correct order status', () => {
        const status = 'Pending';
        const order = {
            orderId: 1,
            orderDate: '2023-06-13',
            status,
            orderItems: [],
        };

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} />
            </Provider>
        );

        expect(screen.getByText(`Order Status: ${status}`)).toBeInTheDocument();
    });

    test('displays order items', () => {
        const orderItems = ['Item 1', 'Item 2', 'Item 3'];
        const order = {
            orderId: 1,
            orderDate: '2023-06-13',
            status: 'Pending',
            orderItems,
        };

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} />
            </Provider>
        );

        orderItems.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    test('calls API consume', async () => {
        const orderId = 1;
        const order = {
            orderId,
            orderDate: '2023-06-13',
            status: 'Pending',
            orderItems: [],
        };

        // Mock the API consume function
        const mockApiConsume = jest.fn(() => Promise.resolve());

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} apiConsume={mockApiConsume} />
            </Provider>
        );

        // Simulate a button click or user action that triggers API consume
        fireEvent.click(screen.getByText('Consume Order'));

        // Wait for the API consume function to be called
        await waitFor(() => {
            expect(mockApiConsume).toHaveBeenCalledTimes(1);
            expect(mockApiConsume).toHaveBeenCalledWith(orderId);
        });
    });

    test('displays loading message while consuming order', async () => {
        const order = {
            orderId: 1,
            orderDate: '2023-06-13',
            status: 'Pending',
            orderItems: [],
        };

        // Mock the API consume function
        const mockApiConsume = jest.fn(() => new Promise(() => {}));

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} apiConsume={mockApiConsume} />
            </Provider>
        );

        fireEvent.click(screen.getByText('Consume Order'));

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).toBeNull();
        });
    });

    test('displays success message after consuming order', async () => {
        const order = {
            orderId: 1,
            orderDate: '2023-06-13',
            status: 'Pending',
            orderItems: [],
        };

        // Mock the API consume function
        const mockApiConsume = jest.fn(() => Promise.resolve());

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} apiConsume={mockApiConsume} />
            </Provider>
        );

        fireEvent.click(screen.getByText('Consume Order'));

        await waitFor(() => {
            expect(screen.getByText('Order consumed successfully.')).toBeInTheDocument();
        });
    });

    test('displays error message if consuming order fails', async () => {
        const order = {
            orderId: 1,
            orderDate: '2023-06-13',
            status: 'Pending',
            orderItems: [],
        };

        // Mock the API consume function
        const mockApiConsume = jest.fn(() => Promise.reject());

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} apiConsume={mockApiConsume} />
            </Provider>
        );

        fireEvent.click(screen.getByText('Consume Order'));

        await waitFor(() => {
            expect(screen.getByText('Failed to consume order. Please try again.')).toBeInTheDocument();
        });
    });

    test('disables consume button while consuming order', async () => {
        const order = {
            orderId: 1,
            orderDate: '2023-06-13',
            status: 'Pending',
            orderItems: [],
        };

        // Mock the API consume function
        const mockApiConsume = jest.fn(() => new Promise(() => {}));

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} apiConsume={mockApiConsume} />
            </Provider>
        );

        fireEvent.click(screen.getByText('Consume Order'));

        const consumeButton = screen.getByText('Consume Order');
        expect(consumeButton).toBeDisabled();

        await waitFor(() => {
            expect(consumeButton).not.toBeDisabled();
        });
    });

    test('does not display consume button if order status is "Consumed"', () => {
        const order = {
            orderId: 1,
            orderDate: '2023-06-13',
            status: 'Consumed',
            orderItems: [],
        };

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} />
            </Provider>
        );

        expect(screen.queryByText('Consume Order')).toBeNull();
    });

    test('displays custom message for consumed order', () => {
        const order = {
            orderId: 1,
            orderDate: '2023-06-13',
            status: 'Consumed',
            orderItems: [],
        };

        render(
            <Provider store={mockStore({})}>
                <OrderPages order={order} />
            </Provider>
        );

        expect(screen.getByText('This order has been consumed.')).toBeInTheDocument();
    });
});
