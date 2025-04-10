# Invoices, Customers, and Sellers Management App

This application is built with **React**, **Vite**, **HTML**, **CSS**, and **JSON Server**. It helps you manage **Invoices**, **Customers**, and **Sellers** with full support for CRUD operations.

## Features

- **Invoices**: View and manage invoices associated with sellers and customers.
- **Customers**: Display and manage customer information, including their associated invoices.
- **Sellers**: Manage seller information and link them to invoices.

## Technologies Used:

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast and modern build tool for React applications.
- **CSS**: For styling the user interface.
- **JSON Server**: Provides a mock REST API for handling CRUD operations in development.
- **Zustand**: A state management library used for handling notifications.

## Setup Instructions

To run the project locally:

1. **Clone the repository**:
   git clone https://github.com/Milos1333/Invoices-Management-App.git

2. **Install dependencies: Navigate to the project folder and run:**

    npm install

3. **Start JSON Server (for simulating backend): Run the following command to start the fake API server:**

    npm run server

4. **Run the Application: In a separate terminal window, run the React application:**

    npm run dev

    Open the application in your browser at http://localhost:3000.


## This application communicates with a JSON Server to simulate backend API calls. The following endpoints are used:

    GET /invoices: Fetches all invoices.

    POST /invoices: Creates a new invoice.

    PUT /invoices/:id: Updates an invoice by ID.

    DELETE /invoices/:id: Deletes an invoice by ID.

    GET /sellers: Fetches all sellers.

    POST /sellers: Creates a new seller.

    PUT /sellers/:id: Updates a seller by ID.

    DELETE /sellers/:id: Deletes a seller by ID.

    GET /customers: Fetches all customers.

    POST /customers: Creates a new customer.

    PUT /customers/:id: Updates a customer by ID.

    DELETE /customers/:id: Deletes a customer by ID.

## How it works

**The application consists of three main features:**

   - Invoices: You can add, edit, or delete invoices that link sellers and customers.

   - Customers: You can view and manage customer data, including their name, address, and associated invoices.

   - Sellers: You can view and manage sellers, including their company name and whether they are active.

   The app uses Zustand for state management and JSON Server to simulate a backend API for real-time data management.


## Author: Miloš Klepić
