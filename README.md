<p>
  <img alt="Build Status" src="https://travis-ci.com/AdilsonFuxe/clean-auth-microservice.svg?branch=main">
  <img alt="Coverage Status" src="https://coveralls.io/repos/github/AdilsonFuxe/clean-auth-microservice/badge.svg?branch=main">
   <img alt="Auth Microservice" src="https://img.shields.io/static/v1?label=Auth%20Microservice&message=V1&color=8257E5&labelColor=000000">
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
  </a>

  <h1 align="center">Node.js Authentication Microservice</h1>

  <p align="center">
   A simple API built with Node.js that follows Clean Architecture + TDD + SOLID + DDD principles
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Endpoints](#endpoints)
  - [SignUp](#signup)
  - [SignIn](#signin)
  - [Forgot Password](#forgot-password)
  - [Reset Password](#reset-password)
  - [me](#me)

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- [NodeJs](https://nodejs.org/)
- [Typescript](https://https://www.typescriptlang.org/)

<!-- GETTING STARTED -->

## Getting Started

to run the project you need to have npm installed on your machine and
the mongo DB

### Prerequisites

to get the npm https://www.npmjs.com/get-npm

### Installation

1. Clone the repo

```sh
git clone https://github.com/AdilsonFuxe/clean-auth-microservice.git
```

2. Server configuration

Enter into the server folder

```sh
cd clean-auth-microservice
```

3. inside the server folder run the following command to install all dependencies

```sh
npm install or yarn
```

4. to generate the build of the project run

```sh
npm run build or yarn build
```

5. to run the server

```sh
npm start or yarn start
```

6. to run the unit tests and the integration tests

```sh
npm test or yarn test
```

<br/>

## Endpoints

<br/>

### SignUp

**POST** `https:/localhost/api/v1/signup`

##### output example

```json
// POST https:/localhost/api/v1/signup

// Request Body
{
  "firstName": "any_name",
  "lastName": "any_name",
  "email": "anyemail@mail.com",
  "password": "any_password",
  "passwordConfirmation": "any_password"
}

// Response Body
{
  "accessToken": "any_access_token"
}
```

<br/>

### SignIn

**POST** `https:/localhost/api/v1/signin`

##### output example

```json
// POST https:/localhost/api/v1/signin

// Request Body
{
  "email": "any_mail@mail.com",
  "password": "any_password"
}

// Response Body
{
  "accessToken": "any_access_token"
}
```

<br/>

### Me

**GET** `https:/localhost/api/v1/me`

##### output example

#####

```json
// Get https:/localhost/api/v1/me
// HEADER x-access-token = any_access_token

// Response Body
{
  "id": "any_id",
  "firstName": "any_name",
  "lastName": "any_name",
  "email": "anyemail@mail.com"
}
```

<br/>

### Forgot Password

**Patch** `https:/localhost/api/v1/forgot`

##### output example

#####

```json
// Patch https:/localhost/api/v1/forgot

// Request Body
{
  "email": "any_mail@mail.com"
}
```

<br/>

### Reset Password

**Patch** `https:/localhost/api/v1/reset-password`

##### output example

#####

```json
// Patch https:/localhost/api/v1/reset-password

// Request Body
{
  "email": "any_mail@mail.com",
  "accessToken": 092498,
  "password": "new_password"
}
```

<br/>

### Signout

**Delete** `https:/localhost/api/v1/signout`

##### output example

#####

```json
// Delete https:/localhost/api/v1/signout
// HEADER x-access-token = any_access_token

// Request Body
Status Code 204
{}
```
