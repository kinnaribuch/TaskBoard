
# TaskBoard

## Overview

TaskBoard is a web-based task management application designed to help users organize their projects through customizable boards, lists, and cards. It provides an intuitive drag-and-drop interface for users to manage their tasks effectively.

### Problem

I worked in a non-profit organization where we relied on a trial version of a task management app for managing projects. However, the free trial expired, disrupting our workflow and causing delays. This gave me the idea to build a task management app that is free and open-source, ensuring that non-profits and other organizations can continue their work without the constraints of trial periods or subscription fees.

### User Profile

-   **Project Managers**: To organize and oversee project tasks.
-   **Teams**: To collaborate and track the progress of shared projects.
-   **Individuals**: To manage personal tasks and stay organized.

Special considerations include:

-   **User-Friendliness**: A simple and intuitive interface for non-technical users.
-   **Collaboration**: Features to support teamwork, such as task assignment and commenting.

### Features

-   **User Authentication**: Users can sign up, log in, and manage their profiles.
-   **Create Boards**: Users can create multiple boards for different projects.
-   **Create Lists**: Within each board, users can create lists to categorize tasks.
-   **Create Cards**: Users can create task cards within lists, with details such as description, assignee, and due date.
-   **Drag-and-Drop Interface**: Easily move cards between lists.
-   **Edit and Delete**: Users can edit and delete boards, lists, and cards.
-   **Assignee and Description Popups**: Users can assign tasks to individuals and add detailed descriptions to cards.

## Implementation

### Tech Stack

-   **Frontend**: React, Tailwind CSS
-   **Backend**: Express.js, Knex.js
-   **Database**: MySQL
-   **Libraries**: Axios for API requests, React Beautiful DnD for drag-and-drop functionality
-   **Hosting**: Heroku or Vercel for backend, Netlify or Vercel for frontend

### APIs

-   **Internal API**: Custom-built API for managing boards, lists, and cards.

### Sitemap

-   **Login Page**: User authentication page.
-   **Sign Up Page**: User registration page.
-   **Dashboard**: Overview of all user boards.
-   **Board View**: Detailed view of a specific board with lists and cards.
-   **Create Board Modal**: Popup to create a new board.
-   **Edit Card Modal**: Popup to edit card details.

### Mockups



### Data

#### Database Schema

-   **Users**
    
    -   id (Primary Key)
    -   firstName
    -   lastName
    -   email
    -   password
-   **Boards**
    
    -   id (Primary Key)
    -   title
    -   color
-   **Lists**
    
    -   id (Primary Key)
    -   title
    -   board_id (Foreign Key)
-   **Cards**
    
    -   id (Primary Key)
    -   title
    -   description
    -   assignee
    -   list_id (Foreign Key)

### Endpoints

-   **User Endpoints**
    
    -   `POST /auth/signup`: Register a new user
    -   `POST /auth/login`: Log in a user
-   **Board Endpoints**
    
    -   `POST /api/boards`: Create a new board
    -   `GET /api/boards`: Retrieve all boards
    -   `DELETE /api/boards/:id`: Delete a board
-   **List Endpoints**
    
    -   `POST /api/lists/:boardId`: Create a new list in a board
    -   `GET /api/lists/:boardId`: Retrieve all lists in a board
-   **Card Endpoints**
    
    -   `POST /api/cards/:listId`: Create a new card in a list
    -   `GET /api/cards/:listId`: Retrieve all cards in a list
    -   `PUT /api/cards/:id`: Update a card
    -   `DELETE /api/cards/:id`: Delete a card

### Auth

Authentication will be implemented using JWT (JSON Web Tokens). Upon successful login, a token will be issued and stored in local storage. This token will be included in the headers of subsequent requests to authenticate the user.

## Roadmap

-   Set up project structure and initialize repositories.
-   Implement user authentication (signup, login).
-  Set up database schema and create basic CRUD operations for boards.
-  Implement CRUD operations for lists.
-   Implement CRUD operations for cards.
-   Integrate drag-and-drop functionality.
-   Finalize UI and conduct testing.

## Nice-to-haves

-   **Real-time Collaboration**: Allow multiple users to edit boards simultaneously.
-   **Notifications**: Send notifications for task updates.
-   **Due Dates and Reminders**: Add due dates to tasks and send reminders.
-   **Search and Filters**: Implement search functionality and filters for tasks.
-   **AI Chatbot**: Integrate a ChatGPT-powered AI chatbot to assist users with task management and provide real-time support.
