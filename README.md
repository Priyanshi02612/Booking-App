# Hotel Booking Website

### Welcome

## Description
A web application for booking hotels with features for searching, booking, and managing reservations.

## Table of Contents
1. Installation
2. Usage
3. Features
4. Technologies Used
5. Configuration
6. Available Scripts
7. Dependencies

## Installation

To install the project and its dependencies, follow these steps:

1. Clone the repository:

```bash
 git clone https://github.com/The-Flex-Team/training-hotel-booking.git
```

2. Install dependencies:

```
npm install
```

## Usage
- Users can search for hotels by location and dates.
- Select rooms and make bookings securely.
- View and manage reservations through a user-friendly interface.

## Features
- Hotel search with filtering options.
- Secure booking and payment processing.
- User authentication and profile management.
- Admin dashboard for managing hotels and reservations.

## Technologies Used
- Frontend: HTML, CSS, JavaScript, React
- Backend: Node.js, Express
- Database: MongoDB
- Payment: Stripe API

## Configuration

### Environment Variables

Create a `.env` file in the root directory of your project. Add the following environment variables:

```
MongoURL=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

## Available Scripts

### Running the Application (PORT: 5173)

To start the application, run following two commands in your terminal: 

```bash
cd client
yarn dev
```

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Running the server (PORT: 4002)

To run server, run following two commands in your terminal:

```bash
cd api
node index.js
```
or

```bash
cd api
nodemon
```

### Build the application

```
npm build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Dependencies

### Backend side

| Dependency        | Version    |
|-------------------|------------|
| bcrypt            | ^5.1.1     |
| body-parser       | ^1.20.2    |
| cookie-parser     | ^1.4.6     |
| cors              | ^2.8.5     |
| dotenv            | ^16.4.5    |
| express           | ^4.19.2    |
| image-downloader  | ^4.3.0     |
| jsonwebtoken      | ^9.0.2     |
| mongoose          | ^8.4.3     |
| multer            | ^1.4.5-lts.1 |
| nodemon           | ^3.1.4     |
| stripe            | ^16.0.0    |
| validator         | ^13.12.0   |

### Frontend side

| Dependency               | Version    |
|--------------------------|------------|
| @chakra-ui/react         | ^2.8.2     |
| @emotion/react           | ^11        |
| @emotion/styled          | ^11        |
| autoprefixer             | ^10.4.19   |
| axios                    | ^1.7.2     |
| date-fns                 | ^3.6.0     |
| framer-motion            | ^4         |
| postcss                  | ^8.4.38    |
| react                    | ^18.2.0    |
| react-calendar           | ^5.0.0     |
| react-datepicker         | ^7.1.0     |
| react-dom                | ^18.2.0    |
| react-grid-gallery       | ^1.0.1     |
| react-icons              | ^5.2.1     |
| react-photo-collage      | ^1.0.9     |
| react-router-dom         | ^6.23.1    |
| styled-components        | ^6.1.11    |
