# Project Documentation

## Jeferson escudero Rua | Linus | NodeJS

## Overview
This project is a web application built using Node.js and Express, with a PostgreSQL database managed through Sequelize. It follows a modular architecture, separating concerns into different directories for models, controllers, middleware, routes, and services.

## Project Structure
```
tin
├── src
│   ├── app.ts                # Entry point of the application
│   ├── config
│   │   └── dbconect.ts       # Database connection configuration
│   ├── controllers            # Business logic for different routes
│   ├── middleware             # Middleware functions for the Express app
│   ├── models                 # Model definitions for the application
│   │   ├── customers.ts       # Customers model
│   │   ├── init-models.ts     # Initializes models and associations
│   │   ├── order_details.ts    # Order details model
│   │   ├── orders.ts          # Orders model
│   │   └── products.ts        # Products model
│   ├── routes                 # Route definitions
│   └── services               # Business logic and model interactions
├── Dockerfile                 # Instructions for building the Docker image
├── docker-compose.yml         # Development environment configuration
├── docker-compose.prod.yml    # Production environment configuration
├── ecosystem.config.cjs      # PM2 process management configuration
├── .dockerignore              # Files to ignore when building the Docker image
├── .env                       # Environment variables for the application
├── package.json               # npm configuration file
├── tsconfig.json             # TypeScript configuration file
├── seeders.sql                # SQL commands for database setup
├── .gitignore                 # Files to ignore in version control
└── README.md                  # Project documentation
```

## Getting Started
1. **Clone the repository:**
   ```
   git clone https://github.com/ljeee/HU-NodeJS.git
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   ```
   DATABASE_URL="postgres://postgres.wdqvjllnbwobwpyyoppx:Jeferson1@aws-1-us-east-1.pooler.supabase.com:6543/postgres"
   DB_USER=postgres.wdqvjllnbwobwpyyoppx
   DB_PASSWORD=Jeferson1
   DB_NAME=postgres
   ```

4. **Run the application:**
   For development:
   ```
   npm run dev
   ```

5. **Build and run with Docker:**
   ```
   docker-compose up --build
   ```

## Database Setup
The project uses PostgreSQL as the database. The initial database schema and seed data can be set up using the `seeders.sql` file.

## Deployment
For production deployment, use the following command:
```
docker-compose -f docker-compose.prod.yml up --build
```

## Scripts
- **Development:** `npm run dev`
- **Test:** `npm test`
- **Build:** `npm run build`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.
