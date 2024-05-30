# Finwallet API

## Overview

This project is a simple Wallet Management API built using Node.js, TypeScript TypeORM, and Postgresql. It provides functionalities for user signup, wallet creation, balance deposit, transfer between wallets, and retrieving user and wallet details,, and retrieving transaction details.

## Features

- User registration
- Wallet creation upon user registration
- Deposit funds into a wallet
- Withdraw funds from a wallet
- Transfer funds between wallets
- Retrieve user details along with wallet and transaction information
- Transaction management with status tracking

## Technologies Used

- **Node.js**: A JavaScript runtime for building fast and scalable server applications.
- **TypeScript**: A statically typed superset of JavaScript that provides type safety and enhanced IDE support.
- **TypeORM**: An ORM that can run in Node.js, browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript.
- **PostgreSQL**: A powerful, open source object-relational database system with a strong reputation for reliability, feature robustness, and performance.

## Technical Decisions

### Why TypeORM?

TypeORM was chosen because it supports TypeScript out of the box, has a rich feature set, and provides an easy-to-use API for managing database entities and migrations. It also supports various database systems, making it a versatile choice for ORM.

### Why PostgreSQL?

PostgreSQL was selected due to its advanced features such as support for JSON, powerful indexing and search capabilities, and its ACID compliance, which ensures data integrity. PostgreSQL's robust transactional support makes it a great choice for applications that require complex transactions.

### Why Use Transactions?

Transactions ensure that a series of database operations are executed in an all-or-nothing fashion. This is crucial for maintaining data consistency, especially in financial applications where operations like transferring funds between wallets must be atomic to prevent data corruption.

### Why Increment/Decrement Balance at the Database Level

Atomicity: Performing the increment or decrement operation directly in the database ensures atomicity. This means that the entire operation is treated as a single, indivisible unit. Either the balance is successfully updated, or the operation fails and the balance remains unchanged. This helps in maintaining the integrity of the data.

Concurrency Control: Databases have built-in mechanisms for handling concurrent transactions. By performing the balance update directly in the database, we leverage these mechanisms to prevent race conditions and ensure that concurrent transactions are handled correctly.

Performance: Performing updates at the database level can be more efficient than fetching the balance, modifying it in the application, and then writing it back. Databases are optimized for such operations and can perform them more quickly and efficiently.



## Endpoints
- **POST /signup**: Register a new user.
- **GET /users**: Retrieve all users.
- **GET /users/:id**: Retrieve a specific user by ID.
- **POST /deposit**: Deposit funds into a user's wallet.
- **POST /transfer**: Transfer funds between wallets.

## Setup and Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/wallet-management-api.git

2. **Navigate to the project directory:**
   ```sh
   cd finwallet
3. **Install dependencies:**
   ```sh
   npm install
4. **Create a `.env` file in the root directory and configure the following environment variables**
   ```sh
    POSTGRES_URL=your_postgresql_url
    POSTGRES_USER=your_postgresql_user
    POSTGRES_PASSWORD=your_postgresql_password
    POSTGRES_DATABASE=your_postgresql_database
    POSTGRES_PORT=your_postgresql_port
    PORT=3000
    JWT_SECRET=your_jwt_secret
    TOKEN_HEADER_KEY="authorization"
5. **Set up the database:**
   ```sh
   npm run typeorm migration:run
6. **Run the application:**
   ```sh
   npm run start

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

