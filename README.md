# Zoom Clone

A video conferencing application clone built with Next.js, TypeScript, Tailwind CSS, Clerk for authentication, and Stream for meetings.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a clone of the popular video conferencing application Zoom. It allows users to create and join meetings, chat with other participants, and share their screens.

## Features

- User authentication with Clerk
- Video conferencing with Stream
- Screen sharing
- Chat functionality
- Responsive design

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Clerk
- Stream

## Getting Started

### Prerequisites

- Node.js and npm installed
- Clerk account for authentication
- Stream account for video conferencing

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ArnaudBand/zoom-clone.git
   cd zoom-clone
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create a `.env.local` file in the root of the project
   - Add the following environment variables:
     ```plaintext
     CLERK_FRONTEND_API_KEY=your_clerk_frontend_api_key
     CLERK_API_KEY=your_clerk_api_key
     CLERK_API_URL=your_clerk_api_url
     STREAM_API_KEY=your_stream_api_key
     STREAM_API_SECRET=your_stream_api_secret
     ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the app running

## Usage

1. Register for an account or log in with Clerk
2. Start a new meeting or join an existing one
3. Enjoy video conferencing with friends and colleagues!

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
