import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Productpages from "../pages/Productpages";

jest.mock("axios");

describe("Productpages Component", () => {
    beforeEach(() => {
        // Mocking axios.get requests
        axios.get.mockImplementation((url) => {
            if (url.includes("/vendors")) {
                return Promise.resolve({
                    data: [
                        {
                            vendoruuid: "vendor1",
                            name: "Vendor 1",
                            address: "Vendor 1 Address",
                        },
                        {
                            vendoruuid: "vendor2",
                            name: "Vendor 2",
                            address: "Vendor 2 Address",
                        },
                    ],
                });
            } else if (url.includes("/products")) {
                return Promise.resolve({
                    data: [
                        {
                            id: 1,
                            name: "Product 1",
                            description: "Product 1 Description",
                            quantity: 10,
                            price: 100,
                            status: "APPROVED",
                            imageUrl: "product1.jpg",
                        },
                        {
                            id: 2,
                            name: "Product 2",
                            description: "Product 2 Description",
                            quantity: 5,
                            price: 50,
                            status: "PENDING",
                            imageUrl: "product2.jpg",
                        },
                    ],
                });
            }
        });
    });

    afterEach(() => {
        axios.get.mockClear();
    });

    test("should load vendors and display them", async () => {
        render(<Productpages />);

        await waitFor(() => {
            expect(screen.getByText("Vendor 1")).toBeInTheDocument();
            expect(screen.getByText("Vendor 2")).toBeInTheDocument();
        });
    });

    test("should select a vendor and load their products", async () => {
        render(<Productpages />);

        await waitFor(() => {
            fireEvent.click(screen.getByText("Vendor 1"));
        });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "http://rsudsamrat.site:8080/pengadaan/dev/v1/products/vendor/vendor1"
            );
            expect(screen.getByText("Product 1")).toBeInTheDocument();
            expect(screen.getByText("Product 2")).toBeInTheDocument();
        });
    });

    test("should filter products by status", async () => {
        render(<Productpages />);

        await waitFor(() => {
            fireEvent.click(screen.getByText("Vendor 1"));
        });

        await waitFor(() => {
            fireEvent.click(screen.getByText("See Pending Product"));
        });

        await waitFor(() => {
            expect(screen.getByText("Product 2")).toBeInTheDocument();
            expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
        });
    });

    test("should filter products by category", async () => {
        render(<Productpages />);

        await waitFor(() => {
            fireEvent.click(screen.getByText("Vendor 1"));
        });

        await waitFor(() => {
            fireEvent.click(screen.getByText("Jasa"));
        });

        await waitFor(() => {
            expect(screen.getByText("Product 1")).toBeInTheDocument();
            expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
        });
    });

    test("should search for products", async () => {
        render(<Productpages />);

        await waitFor(() => {
            fireEvent.click(screen.getByText("Vendor 1"));
        });

        await waitFor(() => {
            fireEvent.change(screen.getByPlaceholderText("Search..."), {
                target: { value: "Product 1" },
            });
        });

        await waitFor(() => {
            expect(screen.getByText("Product 1")).toBeInTheDocument();
            expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
        });
    });

    // Add more tests for other scenarios

});
