# E-Commerce Site Backend

This is the backend of an e-commerce site, built using Express.js API, Sequelize ORM, and MySQL database. The backend handles various functionalities of the e-commerce application, including managing products, categories, and tags.

## Table of Contents

- [Introduction](#introduction)
- [Walkthrough Video](#walkthrough-video)
- [Features](#features)
- - [Product Management](#product-management)
- - [Category Management](#category-management)
- - [Tag Management](#tag-management)
- [Getting Started](#getting-started)
- - [Prerequisites](#prerequisites)
- - [Installation](#installation)
- [Usage](#usage)
- - [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This backend serves as the core of your e-commerce site. It provides APIs to interact with products, categories, and tags, enabling the functionality required for an online store.

## Walkthrough Video

For a detailed walkthrough of how to use the backend and interact with the APIs, you can watch the following video:

[Walkthrough Video](https://drive.google.com/file/d/1T1cLLyTFsHIaEreAVOKSb35-FNFY1qpA/view)

The video covers:
- How to set up the backend environment.
- Explanation of available API endpoints.
- Demonstration of key features and operations.

Feel free to refer to the video for a comprehensive guide to using the backend.

## Features

### Product Management

- View all products with their details.
- Get product details by ID.
- Create new products.
- Update product details.
- Delete products.

### Category Management

- View all categories.
- Get category details by ID.
- Create new categories.
- Update category details.
- Delete categories.

### Tag Management

- View all tags.
- Get tag details by ID.
- Create new tags.
- Update tag details.
- Delete tags.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MySQL database.

### Installation

1. Clone the repository: `git clone https://github.com/andrei-ribeiro-wenceslau/e-commerce.git`
2. Install dependencies: `npm install`
3. Source schema: `SOURCE db/schema.sql;`
4. Run seed file: `npm run seed`
5. Run server: `node server.js`

## Usage
The backend API provides various endpoints to interact with the e-commerce data. Refer to the API documentation for detailed information on available endpoints and request/response formats.

### API Endpoints
- `GET /api/products`: Get all products.
- `GET /api/products/:id`: Get a product by ID.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update a product.
- `DELETE /api/products/:id`: Delete a product.
- More endpoints for categories and tags.

## Contributing
Contributions are welcome! If you find any issues or have enhancements in mind, feel free to submit pull requests or open issues.

## License
This project is licensed under the MIT License.

## Contact
For any questions or inquiries, please feel free to contact:

Email: andrei.ribeirow@gmail.com
GitHub: [andrei-ribeiro-wenceslau](https://github.com/andrei-ribeiro-wenceslau)
