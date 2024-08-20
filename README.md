
  

# TaskBoard

  

## Overview

  

TaskBoard is a web-based task management application designed to help users organize their projects through customizable boards, lists, and cards. It provides an intuitive drag-and-drop interface for users to manage their tasks effectively.

  

### Problem

  

I worked in a non-profit organization where we relied on a trial version of a task management app for managing projects. However, the free trial expired, disrupting our workflow and causing delays. This gave me the idea to build a task management app that is free and open-source, ensuring that non-profits and other organizations can continue their work without the constraints of trial periods or subscription fees.

  

### User Profile

  

-  **Project Managers**: To organize and oversee project tasks.

-  **Teams**: To collaborate and track the progress of shared projects.

-  **Individuals**: To manage personal tasks and stay organized.

  

Special considerations include:

  

-  **User-Friendliness**: A simple and intuitive interface for non-technical users.

-  **Collaboration**: Features to support teamwork, such as task assignment and commenting.

  

### Features

  

-  **User Sign Up & Login:** Users can sign up and log in to manage their tasks and projects.

-  **Create Boards**: Users can create multiple boards for different projects.

-  **Create Lists**: Within each board, users can create lists to categorize tasks.

-  **Create Cards**: Users can create task cards within lists, with details such as description, assignee, and due date.

-  **Drag-and-Drop Interface**: Easily move cards between lists.

-  **Edit and Delete**: Users can edit and delete boards, lists, and cards.

-  **Assignee and Description Popups**: Users can assign tasks to individuals and add detailed descriptions to cards.

  

## Implementation

  

### Tech Stack

  

-  **Frontend**: React, Tailwind CSS

-  **Backend**: Express.js

-  **Libraries**: Axios for API requests, React Beautiful DnD for drag-and-drop functionality

  

### APIs

  

-  **Internal API**: Custom-built API for managing boards, lists, and cards.

  

### Sitemap

  

-  **Login Page**: User authentication page.

-  **Sign Up Page**: User registration page.

-  **Dashboard**: Overview of all user boards.

-  **Board View**: Detailed view of a specific board with lists and cards.

-  **Create Board Modal**: Popup to create a new board.

-  **Edit Card Modal**: Popup to edit card details.

  

### Mockups

  

#### Sign Up Page

![](project_mockups/signup.png)

  

### Log In Page

![](project_mockups/login.png)

  

#### Create New Board

![](project_mockups/create-new-board-ui.png)

  

#### Board List Page

![](project_mockups/board-list-page.png)

  

#### All Board UI

![](project_mockups/all-board-ui.png)

  

#### Project Board UI

![](project_mockups/project-board-ui.png)

  

#### Board Creation Popup

![](project_mockups/board-creation-popup.png)

  

#### TaskBoard Card Actions

![](project_mockups/card-actions.png)

  

#### Task Editor Popup

![](project_mockups/task-editor-popup.png)

  

### Endpoints

  

-  **User Endpoints**

-  `POST /auth/signup`: Register a new user

-  `POST /auth/login`: Log in a user

-  **Board Endpoints**

-  `POST /api/boards`: Create a new board

-  `GET /api/boards`: Retrieve all boards

-  `DELETE /api/boards/:id`: Delete a board

-  **List Endpoints**

-  `POST /api/lists/:boardId`: Create a new list in a board

-  `GET /api/lists/:boardId`: Retrieve all lists in a board

-  **Card Endpoints**

-  `POST /api/cards/:listId`: Create a new card in a list

-  `GET /api/cards/:listId`: Retrieve all cards in a list

-  `PUT /api/cards/:id`: Update a card

-  `DELETE /api/cards/:id`: Delete a card

  

## Steps for Installation


Follow these steps to set up and run the TaskBoard project on your local machine.

### 1. Clone the Repository

```
git clone https://github.com/kinnaribuch/taskBoard.git
```

### 2. Navigate to the Project Directory

```
cd taskboard
``` 

### 3. Install Dependencies

All required dependencies are listed in the `package.json` file. To install them, run:

```
npm install
``` 

### 4. Set the Port Number

Set up a new .env file and copy variables from .env.sample file:

### 5. Run the Project

To start the development server, run:

```
npm run dev
```

### 6. Project Flow
In TaskBoard, users can sign up and log in to manage their tasks and projects efficiently. Once logged in, users can create boards, which serve as the foundation for organizing tasks. Project managers have the added ability to add team members, assign them to specific projects, and assign individual tasks to members.

## Nice-to-haves

## Future Implementations

-   **Login and Signup Validations:** Improve validation checks for better security and user experience.
-   **Forget Password Functionality:** Implement a password recovery feature for users who have forgotten their credentials.
-   **Real-time Collaboration:** Complete the team members functionality to ensure that only assigned members appear in the assignee dropdown.
-   **AI Chatbot:** Integrate a Gemini-powered AI chatbot to assist users with task management and provide real-time support.
-   **Google Calendar Integration:** Add a feature to sync tasks with Google Calendar, allowing users to schedule meetings and set reminders seamlessly.
-   **Notifications:** Send notifications to users for task updates, ensuring everyone stays informed.
-   **Due Dates and Reminders:** Add the ability to set due dates for tasks and send reminders as deadlines approach.
-   **Search and Filters:** Implement robust search functionality and filters to help users find and manage tasks more efficiently.