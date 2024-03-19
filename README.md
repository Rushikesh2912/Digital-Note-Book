# MERN Stack Digital Notebook
Welcome to our MERN stack-based digital notebook project! This application allows users to create, manage, and organize their notes seamlessly using a MongoDB, Express.js, React.js, and Node.js (MERN) stack.
## Features
   * **Create Notes:** Easily create new notes with a title, content, and optional tags.
   * **Edit and Update:** Modify existing notes and update them with new information or revisions.
   * **Delete Notes:** Remove unwanted notes from the system.
   * **Tagging:** Categorize notes using tags for better organization and retrieval.
   * **User Authentication:** Secure user authentication system to protect personal notes.
   * **Responsive Design:** Access and manage notes from any device with a responsive user interface use a Bootstrap
## Technologies Used
   * ### Frontend:
     * HTML, CSS, JavaScript
     * React.js
     * Redux for state management
     * React Router for client-side routing
  * ### Backend:
    * Node.js
    * Express.js
  * ### Database:
      * MongoDB (for storing user favorites)
  * ### Authentication:
      * JSON Web Tokens (JWT) for authentication
  * ### API-Testing:
      * Thunder Client Extension in VS Code for API Testing
   
  ## Setup Instructions
  1. Clone the repository:
     * git clone https://github.com/Rushikesh2912/Digital-Note-Book.git
  2. Navigate to the project directory:
      * cd Digital-Note-Book
  3. Install dependencies for both the frontend and backend:
      * cd client && npm install
      * cd ../server && npm install
  4. Configure environment variables:
      * Create a .env file in the server directory.
      * Define environment variables for MongoDB connection URI, JWT secret, and News API key.
  5. Start the backend as well as frontend server:
      * npm run both
  6. Open your browser and visit http://localhost:3000 to access the application.
