# WeGroovy Wiki

Welcome to the WeGroovy Wiki!

This is a full-stack web application built using React, Redux, Flask, SQLAlchemy, AWS, Google Maps API, Python, and Javascript.

This application is currently hosted on Heroku! [WeGroovy](https://wegroovy.herokuapp.com/)

<br />

## MVP Feature List:

**As a** musician, **I want** to be able to customize my profile **so that** I can provide useful signals to my professional and social network.


**As a** musician, **I want** to be able to upload gear **so that** I that I can share my collection with others.

**As a** musician, **I want** to be able to view other local musicians' gear **so that** I can expand my professional network and, potentially, instantiate transactions.

**As a** musician, **I want** to be able to make text posts **so that** I can share my thoughts with my network, as well as ask for recommendations.

**As a** musician, **I want** to be able to make image posts **so that** I can share multimedia with my network.


<br />

## Database Model:

<img src="https://wegroovybaby.s3.amazonaws.com/Screen+Shot+2020-11-11+at+11.12.20+AM.png">

<br />

## Portion of SQLAlchemy Query to Return Users in a Specified Locale:

This query utilizes the latitude and longitude returned from the Google Maps Geocoding API and utilizes the sqlachemy "func" operator to implement a function within a query.

<img src="https://wegroovybaby.s3.amazonaws.com/Screen+Shot+2020-11-11+at+11.18.35+AM.png">

<br />

<!-- ## RESTful EndPoints: -->

<!-- | Method         | Path              | Purpose              |
|---             |---                |---                   |
| Get            | /                 |  Home Page           |
| Post           | /users            |  Create User Account |
| Get            | /users/:id        |  Access User Account |
| Get            | /users/sign-up    |  Create User Form    |
| Get            | /users/sign-in    |  User Login Form     |
| Post           | /users/sign-in    |  Authenticate User   |
| Get            | /users/:id/update |  Form to Update Account Details |
| Get            | /users/:id/jobs   |  View a list of past/present jobs |
| Patch          | /users/:id        |  Update User Account |
| Delete         | /users/:id        |  Delete User Account |
| Get            | /jobTypes         |  Show All job Types  |
| Get            | /jobTypes/:id     |  Show All taskers for job Type |
| Get            | /jobTypes/:id/:taskerId |  Show details about tasker  |
| Post           | /jobs             |  Create new job (user & tasker)  | -->

