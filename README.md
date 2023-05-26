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

* POST  /api/register - Create a new user.
* POST  /api/login - Signs user in.
* GET  /api/me - Get my user personal user details.
* GET  /api/bymail - Get user details by email.
* GET  /api/byaccount - Get user details by accountNumber.
* GET  /api/mywallet - Get my wallet details.
* POST /api/transfer - Perform a wallet-to-wallet transfer in-app.
* POST /api/fund - Fund a wallet via Paystack.
* GET /api/verifyfunds - Verify payment initiated by Paystack and update wallet balance.
   
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
