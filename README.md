# Monitest API

This is an example project that demonstrates the usage of Express, TypeScript, and Mongoose to build a server application with three models: `User`, `Wallet`, and `Transaction`. The server allows transfers between wallets and funding via Paystack.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or above)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:

   ```shell
   git clone <repository-url>
   cd Monitest

2. Install the dependencies:
   ```shell
   npm install

3. Configure environment variables:

Create a .env file in the project root and provide the necessary configuration variables. For example: as also seen in .env.example 
   ```shell
      MONGO_URI= 
      JWT_SECRET=
      JWT_EXPIREII=
      AXIOSBASEURL=
      PAYSTACK_SECRET_KEY=
      CALLBACK_URL=
      PORT=3000
   ```

4. Build the TypeScript code:
   ```shell
   npm run build

5. Start the server
   ```shell
   npm start

## API Routes
The server exposes the following routes:

* POST  /api/user/register - Create a new user.
* POST  /api/user/login - Signs user in.
* GET  /api/user/me - Get my user personal user details.
* GET  /api/user/bymail - Get user details by email.
* GET  /api/user/byaccount - Get user details by accountNumber.
* GET  /api/wallet/mywallet - Get my wallet details.
* POST /api/wallet/transfer - Perform a wallet-to-wallet transfer in-app.
* POST /api/wallet/fund - Fund a wallet via Paystack.
* GET /api/wallet/verifyfunds - Verify payment initiated by Paystack and update wallet balance.
* GET /api/ttransactions//mytransactions - Get all my transactions.
   
## Models
User
The User model represents a user and has the following properties:

* firstName (string) - The user's first name.
* lastName (string) - The user's last name.
* email (string) - The user's email address.
* password (string) - The user's password.
* accountNumber (number) - The user's account number.

Wallet
The Wallet model represents a wallet and has the following properties:

* balance (number) - The wallet balance.
* user (reference to User model) - - The user associated with the wallet.
