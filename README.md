#  MERN Blog Editor

A full-featured **Blog Editor** application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This app allows users to create, auto-save, edit, delete, and publish blog posts with an intuitive and responsive user interface.

##  Features

- Create and edit blogs with:
  - Title input
  - content editor
  - Optional tags (comma-separated)
- Auto-save to **drafts** after 10 seconds of user inactivity (debounce)
- Manual **Save as Draft** option
- **Publish** blogs
- View lists of **Published** and **Draft** blogs
- Edit existing blogs (both drafts and published)
- **Delete** blogs
- Notifications for save and update events

##  Tech Stack

### Frontend
- **React.js**
- **Axios** for API communication
- **React Router** for navigation

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **CORS**, **dotenv**, and **body-parser**

Clone the Repository
    git clone https://github.com/SSrivastava18/Blog-Editor-Page.git
    cd mern-blog-editor

## Backend Setup
    cd server
    npm install

   Create a .env file inside server/:
       PORT= Your own port number.
       MONGO_URI=Your own mongo atlas uri.

   Start the server:
       npm run dev
       
## Frontend Setup
    cd client
    npm install
    npm start







