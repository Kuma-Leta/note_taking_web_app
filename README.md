

 Note Taking Web App

A powerful and efficient note-taking web application built with Vite, TypeScript, and the MERN (MongoDB, Express, React, Node.js) stack.

Features

- Fast and Responsive**: Leveraging Vite for a fast development environment and optimized production build.
- TypeScript**: Strongly typed front-end and back-end code for improved maintainability and fewer runtime errors.
- MERN Stack**: Seamless integration of MongoDB, Express, React, and Node.js for full-stack development.
-CRUD Operations**: Create, Read, Update, and Delete notes with a user-friendly interface.
- User Authentication**: Secure login and registration system.
- Rich Text Editing**: Enhanced note-taking experience with a rich text editor.
- Real-time Updates**: Notes are updated in real-time across multiple devices.

 Demo


 Getting Started

 Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later) or Yarn
- MongoDB (local or remote instance)

 Installation

1. Clone the repository**

   
   git clone https://github.com/Kuma-Leta/Note-Taking-Web-App.git
   cd Note-Taking-Web-App


2.Install dependencies**

   For the server (backend):
   ```sh
   cd server
   npm install
   ```

   For the client (frontend):
   ```sh
   cd ../client
   npm install
   ```

 Configuration

1.Server Configuration**

   Create a `.env` file in the `server` directory and add the following environment variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/noteapp
   JWT_SECRET=your_jwt_secret
   ```

2. Client Configuration**

   Create a `.env` file in the `client` directory and add the following environment variables:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

 Running the Application

1. Start the MongoDB server

   Make sure your MongoDB server is running. If you are using a local instance, you can start it with:

   ```sh
   mongod
   ```

2. Start the backend server

   In the `server` directory:

   ```sh
   npm start
   ```

   The backend server will start on `http://localhost:5000`.

3. Start the frontend development server

   In the `client` directory:

   ```sh
   npm run dev
   ```

   The Vite development server will start on `http://localhost:3000`.

 Building for Production

1. Build the client 

   In the `client` directory:

   ```sh
   npm run build
   ```

2.Serve the client

   After building the client, you can serve it using any static file server. Alternatively, you can integrate the build output with the backend server.

 Folder Structure

```
Note-Taking-Web-App
├── client          # Frontend application (React + TypeScript + Vite)
│   ├── public      # Static files
│   ├── src         # Source files
│   │   ├── assets  # Assets (images, styles, etc.)
│   │   ├── components # React components
│   │   ├── pages   # Page components
│   │   ├── services # API service files
│   │   ├── App.tsx # Main App component
│   │   └── main.tsx # Entry point
│   ├── .env        # Environment variables
│   └── vite.config.ts # Vite configuration
├── server          # Backend application (Node.js + Express + TypeScript)
│   ├── src         # Source files
│   │   ├── controllers # Controllers for handling requests
│   │   ├── models  # Mongoose models
│   │   ├── routes  # Express routes
│   │   ├── middlewares # Express middlewares
│   │   └── server.ts # Main server file
│   ├── .env        # Environment variables
│   └── tsconfig.json # TypeScript configuration
└── README.md       # This README file
```

Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this template based on the specific details and requirements of your project.
