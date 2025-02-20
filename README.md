# Task Manager App

This is a simple app to allow users to manage tasks, including create, run and cancel the tasks.

## Setup

Install the app dependencies by running:

### `yarn install`

## Running the app

In the project directory, you can run:

### `yarn start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Key Decisions

### User interface

The UI is created with a focus on simplicity and ease of use. Hence, all task details are displayed in a table, without the need for any extra click to get more details. The actions, i.e. create, run, cancel task actions, are also displayed in a single view to allow quick execution.

### Task Service

A TaskService interface is created to allow the implementation of MockTaskService, and when the API is ready, a RemoteTaskService can be created to call the API.

The TaskService is instantiated when the app started. When there are multiple implementations of TaskService, we can use some condition to determine the class to be instantiated. The service instance is then passed via the AppContext to be accessed in the app.

### Tasks Data Source

Due to time constraint, this is now mocked as a local object in the app. The tasks data should come from the server. If given more time, the MockTaskService should hold the tasks data and allow a method to retrieve all data, either via polling or subscription.

Task creation and status updates are now performed by the app on the local `tasks` object directly. This is a quick way to mock data mutation. If given more time, the MockTaskService should be responsible for task creation and state updates.

### Framework

This app is created with React Typescript to enforce type safety for code quality and maintainability.
