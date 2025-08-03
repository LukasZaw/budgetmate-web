# Project Title

BudgetMate Web Server

## Description

BudgetMate is a web application designed to help users manage their finances effectively. This server-side application is built using Node.js, Express, and Prisma, providing a robust API for user management and transaction tracking.

## Features

- User registration and authentication
- CRUD operations for user accounts
- Transaction management
- Middleware for authentication and authorization
- TypeScript for type safety

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/budgetmate-web.git
   ```

2. Navigate to the server directory:

   ```
   cd budgetmate-web/server
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables. Example:
   ```
   DATABASE_URL=your_database_url
   PORT=4000
   ```

## Usage

To start the server in development mode, run:

```
npm run dev
```

The server will be running on `http://localhost:4000`.

## API Endpoints

- `GET /api/users` - Retrieve all users
- `POST /api/users` - Create a new user

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
