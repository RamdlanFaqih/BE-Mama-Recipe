
# Mama Recipe Backend Documentation

This comprehensive documentation outlines the backend development of the Mama Recipe website. Built with robust technologies, our backend ensures seamless communication between the frontend and the PostgreSQL database, providing users with a smooth, responsive, and enjoyable cooking experience. Explore the workings of APIs, and learn about the technologies driving Mama Recipe's robust culinary platform. Dive into this guide to uncover the backend magic that powers of interactive cooking community.

## Table of Contents

- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Built With](#built-with)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Project Structure

```plaintext
|── Mama RecipeBackend
   |── public                  # Public assets (images, etc.)
   |── src                     # Project source code
       |── config              # Configuration files
       |   ├── db.js            # Database configuration settings
       |   └── redis.js         # Redis configuration settings
       |
       |── controller          # Request handlers and route controllers
       |   ├── productController.js   # Product-related logic
       |   ├── recipesController.js   # Recipes-related logic
       |   └── userController.js      # users-related logic
       |
       |── helper              # Helper functions and utilities
       |   ├── jwt.js          # JSON Web Token utility functions
       |   └── cloudinary.js   # Cloudinary configuration settings
       |
       |── middleware          # Custom middleware functions
       |   ├── auth.js         # Authentication middleware
       |   ├── hitByRedis.js   # 
       |   ├── staticAuth.js   # 
       |   └── upload.js       # 
       |
       |── model               # Database models and schema definitions
       |   ├── productModel.js   # Product model schema
       |   ├── recipesModel.js   # Product model schema
       |   └── userModel.js      # Users model schema
       |
       |── router              # Route definitions and API endpoints
       |   ├── productRouter.js   # Product-related routes
       |   ├── recipesRouter.js   # Recipes-related routes
       |   └── userRouter.js      # Users-related routes
   |
   |── .gitignore              # List of files to be ignored by Git
   |── README.md               # Project documentation for GitHub

```

## Database Schema
```plaintext
- Users Table
  users_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email_address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  level INT,
  image TEXT NULL
- My Recipes Table
   recipes_id SERIAL PRIMARY KEY,
   food_name VARCHAR(255) NOT NULL,
   image TEXT,
   ingredients TEXT NOT NULL,
   video_title VARCHAR(255),
   video TEXT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   users_id INT NOT NULL
- Liked Recipes Table
    liked_recipes_id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    recipes_id INT NOT NULL
- Saved Recipes Table
    saved_recipes_id SERIAL PRIMARY KEY,
    users_id INT NOT NULL,
    recipes_id INT NOT NULL
```

## Authentication

- JSON Web Tokens (JWT) are used for user authentication.
- User passwords are hashed before storing them in the PostgreSQL database.

## Built With

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js.
- **PostgreSQL**: Relational database management system for data storage.
- **JWT**: JSON Web Tokens for user authentication.

## Usage

1. Ensure Node.js and PostgreSQL are installed on your system.
2. Clone this repository to your local machine: `git clone <repository_URL.git>`
3. Navigate to the project directory: `cd mama-recipe-backend`
4. Install project dependencies: `npm install`
5. Set up your PostgreSQL database connection in `config/db.js`.
6. Run the server: `npm start`
7. Run API Endpoint
   API Enpoint are available in this postman documentation bellow
   
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/29238474-d72b571b-7db8-4676-a1a4-955688cefd1d?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29238474-d72b571b-7db8-4676-a1a4-955688cefd1d%26entityType%3Dcollection%26workspaceId%3D40e9bb5c-776f-407a-b507-a57b0d2a6b7b)

## Related Project
- [Mama Recipe Website](https://github.com/RamdlanFaqih/mama-recipe-redux) - Website for Mama Recipe
- [Mama Recipe Mobile](https://github.com/RamdlanFaqih/BE-Mama-Recipe) - Mobile Apps for Mama Recipe


**Contributing**

We welcome contributions from the community. If you encounter bugs or wish to add new features, please create a pull request or issue in this repository. Your assistance is invaluable in enhancing the Mama Recipe backend.

---

For any queries or further assistance, feel free to reach out. Thank you for your contribution to the Mama Recipe backend development!
