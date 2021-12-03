# Introduction

This project was created for managing tasks. The following functionalities are supported:

- create a new task with a description, start date, end date
- you can mark a task as finished
- you can edit a task
- you can delete a task

# API Documentation

Documentation for the REST API endpoints:
#### Replace localhost:3000 with the URL you have started your backend on

https://documenter.getpostman.com/view/12214895/UVJfjvat

# Technologies used

- Backend /in the server folder/

For the backend, the main stack was Flask, SQLAlchemy and Marshmallow.
I separated the models, routes and schemas in different files.

- Frontend /in the client folder/

Frontend is written in ReactJS, with the help of the MUI component library.

# Bootstrap

#### I excluded the database from version controlling, so you will start with and empty database.
### With docker

Bootstrap the application is the easiest this way following these instructions:
> cd server
>
> docker build -t task-backend-api .
>
> docker run -d -p 3000:3000 task-backend-api

The previous commands will bootstrap the backend application in a Docker container, 
and the application will be visible on your `localhost:3000` port.

Then:
> cd client
> 
> yarn or npm install
>
> yarn start or npm start

This will bootstrap the frontend application - in dev mode - and you can use the application on `localhost:4040`.
Of course, you can use a production build, then you have to do:

> cd client
> 
> yarn build --prod
> 
> http-server ./build -P http://localhost:3000

# Supported browsers

- Firefox
- Chrome
- Edge

There is no ES5 polyfill configured.
IE11 is not supported.
