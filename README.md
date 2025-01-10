
# Backend (NestJS) - README

## Prerequisites

- Node.js (version 16 or higher)
- npm or Yarn
- PostgreSQL (or any other database supported by your application)
- Clone the influencer-backend repository

## Installation

1. Navigate to the project directory:
   ```bash
   cd influencer-backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Database Setup

 copy this MONGO_URI and paste in `.env` file at the root of your backend directory:

```
MONGO_URI=mongodb+srv://isbienvenu3:PCS2Q5aqKX9O2ekV@influencecluster.fenwa.mongodb.net/?retryWrites=true&w=majority&appName=influenceCluster
```

## Running the Development Server

1. Start the backend server:
   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

2. The server will run on:
   ```
   http://localhost:3001
   ```

## Endpoints

- **Get all Campaigns**: `GET /campaigns`
- **Get Campaign by ID**: `GET /campaigns/:id`
- **Submit Content**: `POST /campaigns/:id/submit`

## Environment Variables

Ensure you have the following in your `.env` file:

```
PORT=3001
DATABASE_URL=postgres://username:password@localhost:5432/your_database
JWT_SECRET=your_secret_key
```
Replace placeholders with your actual values.

## Notes

- Ensure your frontend `.env.local` points to this backend server.
- Run database migrations if applicable:
   ```bash
   npm run migrate
   
