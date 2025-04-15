# Q&A Board Frontend

A simple Q&A board application built with React and Vite.

## Project Structure

```
src/
├── api/                # API services
│   └── questionApi.js  # Question API service
├── components/         # Reusable components
│   └── ui/             # UI components
│       ├── ErrorMessage.jsx
│       ├── LoadingSpinner.jsx
│       ├── QuestionCard.jsx
│       └── index.js
├── pages/              # Page components
│   ├── QuestionsPage.jsx
│   └── index.js
├── App.jsx             # Main App component
├── index.css           # Global styles
└── index.jsx           # Entry point
```

## Features

- Display a list of questions from the API
- Responsive design with Tailwind CSS
- Loading and error states

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   pnpm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   VITE_API_BASE_URL=http://localhost:8080
   ```

### Development

Run the development server:

```
npm run dev
```

or

```
pnpm dev
```

The application will be available at http://localhost:3000.

### Building for Production

Build the application for production:

```
npm run build
```

or

```
pnpm build
```

The built files will be in the `dist` directory.

## API Endpoints

- `GET /question` - Get all questions
