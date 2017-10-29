# Strain Scout <img src='/src/assets/images/ss-icon.png?raw=true' height='80px'>

##### By Joshua Fairchild, August 2017 - Epicodus Capstone Project

#### [Live site viewable here](https://strainscout.herokuapp.com/)

## Description
The frontend of the application was created with Angular CLI and Materialize. An Express server is used for making requests to the Cannabis Reports API, and RxJS is used for handling API responses.

The application provides a simple interface for browsing cannabis strains and getting an overview of information about specific strains. Currently the application allows users to search for strains by name and then view a details page containing the strain's genetics, geographic lineage, effects, and terpene flavors. Future plans for the project include:
* Allowing a user to view more information about the genetic parents of a given strain.
* Provide users with an option to search for strains based off of parameters (effects, flavors, location, seed company, etc) rather than name alone.
* Provide a user with a list of reviews for the strain that they are viewing.
* Add a section to a strain's details overview that contains information about the seed company that produces the strain.

#### Screenshots

##### Landing Page
![](/src/assets/images/screens/screen1.png?raw=true)

#### Search Results
![](/src/assets/images/screens/screen2.png?raw=true)

#### Details Overview
![](/src/assets/images/screens/screen3.png?raw=true)

#### Effects and Flavors
![](/src/assets/images/screens/screen4.png?raw=true)



## Installation Requirements
You must have the following software installed on your machine:

* [Git](https://git-scm.com/)
* [NodeJS](https://nodejs.org/) and npm
* [TypeScript](https://www.typescriptlang.org/)
* [Angular CLI](https://www.npmjs.com/package/@angular/cli/tutorial)

## Setup Instructions

* Clone this repository

  `$ git clone https://github.com/joshuafairchild1/strain-scout`

* Run the following command from the root directory:

  `$ npm install`

This will download the project's dependencies

* Run `$ ng serve` for a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

* The express server is started by running `node server.js` from the root of the project.

## Built With

* Angular 4 using TypeScript
* Angular CLI v1.0.0
* ExpressJS
* [CannabisReports](https://www.cannabisreports.com/) API
* SASS

## License

This application is licensed under the MIT License

Joshua Fairchild Copyright (c) 2017
