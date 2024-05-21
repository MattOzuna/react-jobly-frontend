# Jobly - Frontend

Welcome to Jobly, a mock job search website built with React. This README provides an overview of the project,  and how to set it up. Jobly is designed to help users find job listings, get information on companies.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- **Job Listings**: Browse a list of available job positions.
- **Search and Filter**: Search for jobs by title.
- **Company Details**: View information about each Company.
- **User Authentication**: Sign up and log in to save job searches and track applications.

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Styling**: CSS Modules / Styled Components / Bootstrap / React-Boostrap
- **Authentication**: Bcrypt
- **API**: [https://github.com/MattOzuna/react-jobly-backend](https://github.com/MattOzuna/react-jobly-backend)

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository**
   ```sh
   git clone https://github.com/MattOzuna/react-jobly-frontend
   ```

2. **Navigate to the project directory**
   ```sh
   cd frontend
   ```

3. **Install dependencies**
   ```sh
   npm install
   ```

4. **Start the development server**
   ```sh
   npm run dev
   ```

## Usage

Once the development server is running, open your browser and navigate to localhost port used. You should see the Jobly homepage.

### Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

## Project Structure

```
frontend/
├── public/
│── index.html
├── src/
│   ├── components/
│       └── ...
│   ├── tests/
│   ├── hooks/
│   ├── api/
│   ├── App.jsx
│   ├── index.jsx
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

- **`components/`**: Reusable UI components.
- **`tests/`**: Tests corresponding to different components.
- **`api/`**: API calls.
- **`App.js`**: Main application component.
- **`index.js`**: Entry point of the application.