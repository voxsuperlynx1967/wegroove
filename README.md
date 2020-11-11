# WeGroovy Wiki

Welcome to the WeGroovy Wiki!

This is a full-stack web application built using React, Redux, Flask, SQLAlchemy, AWS, Google Maps API, Python, Material-UI, and Javascript.

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

This database model includes the storage of metadata and, thusly, an expanded ability to create and store data about various instruments. Further expansion of the model might include a "TagChoice" table, which would store data about user options for various "Tags." 

<img src="https://wegroovybaby.s3.amazonaws.com/Screen+Shot+2020-11-11+at+11.12.20+AM.png">

<br />

## Portion of SQLAlchemy Query to Return Users in a Specified Locale:

This query utilizes the latitude and longitude returned from the Google Maps Geocoding API and utilizes the sqlachemy "func" operator to implement a function within a query.

<img src="https://wegroovybaby.s3.amazonaws.com/Screen+Shot+2020-11-11+at+11.18.35+AM.png">

<br />

## EndPoints:

| Method         | Frontend Path     | Purpose              |
|---             |---                |---                   |
| Get            | /                 |  Home page           |
| Get            | /signup           |  User signup form    |
| Post           | /signup           |  Create user account |
| Get            | /login            |  User login form     |
| Post           | /login            |  Authenticate user   |
| Get            | /feed             |  View posts/likes/following and the post form |
| Post           | /feed             |  Create a text or image post |
| Post           | /feed             |  Like a user's posts |
| Get            | /users/:id        |  View a user's profile |
| Post           | /users/:id        |  Like a user's post  |
| Put            | /users/:id        |  Update your profile |
| Get            | /users/:id/gear   |  View a user's gear and gear attributes  |
| Get            | /gear/new         |  Gear creation form  |
| Get            | /gear/new         |  Create gear         |
| Get            | /gear/attributes  |  Gear attribute form |
| Post           | /gear/attributes  |  Add a gear attribute |
| Get            | /browse/gear/all  |  View all gear in your area  |
| Put            | /jobs             |  Filter gear in your area by mile radius and gear type |

