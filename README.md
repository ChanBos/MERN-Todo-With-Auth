<h1 align="center">Welcome to MERN-Todo-With-Auth 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-16.2.0-blue.svg" />
  <img src="https://img.shields.io/badge/npm-7.19.1-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> MERN Stack Todo Application with JWT Authentication

![Todo App](https://github.com/ChanBos/MERN-Todo-With-Auth/blob/master/client/public/images/To-Do%20App.png)

### ✨ [Deployed application](https://mern-todo-with-auth.herokuapp.com/)

## Table of Contents:

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage Instructions](#usage-instructions)
- [Application Security](#application-security)
- [Handling of User Credentials and Other Secure Information](#handling-of-user-credentials-and-other-secure-information)
- [Credits](#credits)
- [Author Details](#author-details)

## Prerequisites

- node 16.2.0
- npm 7.19.1

## Installation

To run this project, do the following:

1. Select the directory that you wish to clone the project into. Example below:

```sh
cd folder/to/clone-into/`
```

2. Enter git clone [repository_URL] into the terminal or command prompt. Code and link below:

```sh
gh repo clone ChanBos/MERN-Todo-With-Auth`
```

3. If you want a different folder name, simply specify it as the last parameter. Example below:

```sh
gh repo clone ChanBos/MERN-Todo-With-Auth other-name`
```

This will create a new directory which will initialize a .git directory within it, pulling all of the data from this project. You will find all of the files and folders in this directory, enabling you to use and edit it to your liking.

4. Navigate to this directory from the command line interface.

```sh
cd "C:\Users\user\...
```

5. Navigate to both the server and the client's directories in the command line interface and type the following to install all of the necessary node modules:

```sh
npm install
```

7. Open the server and the client to view the application in the browser. The server runs on http://localhost:8000/search and the client on http://localhost:3000.

## Usage Instructions

In the command line interface respectively type the following to run the client and server in development mode:

- Client

```
npm start
```

- Server

```
nodemon server.js
```

This application features a page that allows a user to sign up or sign in. Once the user enters the credentials, this will be authenticated and authorized using JSON Web Tokens, Bcrypt and Bcrypt Gensalts.

Once the user logs in, they can make use of the to-do application. They can get the list of to-dos from MongoDb's database and edit this list.

Users can create and delete items from the list of to-dos. This has been accomplished by making use of CRUD (Create, Read, Update and Delete) operations. Please note that the update feature has not been implemented.

## Application Security

Helmet.js has been utilized to increase the security of the application. Helmet is a middleware for Express applications. It sets many different HTTP headers and aims to make applications more secure.

Adding these headers can help in avoiding attacks such as Cross-Site-Scripting (XSS), clickjacking, etc.

## Handling of User Credentials and Other Secure Information

1. Created a .env file in the root of the project, outside of the src folder.
2. Added the information to this file.
3. The .env file has been added to the .gitignore file. This file stipulates what files not to upload.

Click here for more information: https://dev.to/eprenzlin/env-gitignore-and-protecting-api-keys-2b9l

## Credits

- HyperionDev - https://www.hyperiondev.com/
- Stack Overflow - https://stackoverflow.com/

## Author

👤 **Chanelle Bösiger**

- LinkedIn: https://www.linkedin.com/in/chanelle-b%C3%B6siger-70587767/
- Github: [@ChanBos](https://github.com/ChanBos)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
