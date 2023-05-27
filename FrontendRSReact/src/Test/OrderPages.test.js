import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Orderpages from './Orderpages';

jest.mock('axios');

describe('Orderpages', () => {
    beforeEach(() => {
        // Mock axios.get() implementation for the initial data fetch
        axios.get.mockResolvedValueOnce({
            data: {
                content: [
                    {
                        orderId: 1,
                        orderDate: '2023-05-01',
                        status: 'Pending',
                    },
                    {
                        orderId: 2,
                        orderDate: '2023-05-02',
                        status: 'Completed',
                    },
                ],
            },
        });
    });

    test('renders order table with data', async () => {
        render(<Orderpages />);

        // Wait for the data to be fetched and rendered
        await screen.findByText('Order ID');
        await screen.findByText('Order Date');
        await screen.findByText('Status');

        // Verify that the table is rendered with the fetched data
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2023-05-01')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('2023-05-02')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    test('opens order details modal on button click', async () => {
        render(<Orderpages />);

        // Wait for the data to be fetched and rendered
        await screen.findByText('Order ID');
        await screen.findByText('Order Date');
        await screen.findByText('Status');

        // Mock axios.get() implementation for opening the order details modal
        axios.get.mockResolvedValueOnce({
            data: {
                orderItems: [
                    {
                        id: 1,
                        product: {
                            productuuid: 'uuid-1',
                            vendor: {
                                name: 'Vendor 1',
                            },
                            name: 'Product 1',
                            price: 10,
                        },
                        quantity: 2,
                    },
                ],
            },
        });

        // Click the "Nota" button to open the modal
        fireEvent.click(screen.getByText('Nota'));

        // Wait for the order details modal to be rendered
        await screen.findByText('Order Details');
        await screen.findByText('Product Name');
        await screen.findByText('Quantity');

        // Verify that the order details modal is rendered with the fetched data
        expect(screen.getByText('Order Details')).toBeInTheDocument();
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Vendor 1')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    // Add more tests for other functionality as needed
});
