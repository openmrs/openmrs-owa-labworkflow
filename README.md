<img src="https://cloud.githubusercontent.com/assets/668093/12567089/0ac42774-c372-11e5-97eb-00baf0fccc37.jpg" alt="OpenMRS"/>

# openmrs-owa-labworkflow

This repository contains the openmrs-owa-labworkflow OpenMRS Open Web App.

> Add a description of what your app does here.

For further documentation about OpenMRS Open Web Apps see
[the wiki page](https://wiki.openmrs.org/display/docs/Open+Web+Apps+Module).

## Development

### Production Build

You will need NodeJS 6+ installed to do this. See the install instructions [here](https://nodejs.org/en/download/package-manager/).

Once you have NodeJS installed, install the dependencies (first time only):

```sh
npm install
```

Build the distributable using [Webpack](https://webpack.github.io/) as follows:

````sh
npm run build:prod
````

This will create a file called `labworkflow.zip` file in the project directory,
which can be uploaded to the OpenMRS Open Web Apps module.

### Local Deploy

To deploy directly to your local Open Web Apps directory, run:

````
npm run build:deploy
````

This will build and deploy the app to the `/Users/andeladeveloper/Downloads/referenceapplication-standalone-2.8.0/appdata/owa`
directory. To change the deploy directory, edit the `LOCAL_OWA_FOLDER` entry in
`config.json`. If this file does not exists, create one in the root directory
that looks like:

```js
{
  "LOCAL_OWA_FOLDER": "/Users/andeladeveloper/Downloads/referenceapplication-standalone-2.8.0/appdata/owa"
}
```

## Running Cypress tests

When you clone this repo for the first time or pull the latest updates, you wiil need to run `npm install` which will also install `cypress` and `start-server-and-test` as dev dependencies, and then as usual run `npm link @openmrs/react-components` to link to the correct
version of React Components.

Using the sample "cypress.env.json.sample" file, create a file "cypress.env.json" at the root level of this repo which sets two environmental variables for the username and password you will be using to 
connect to the server.  This would be a username and password on the underlying OpenMRS instance you have running in your dev environment.

```
{
  "username": "your-username",
  "password": "Your-Password"
}
```

NOTE: To run tests make sure your OpenMRS instance is running and this OWA is started and linked up to the instance.

To fire up Cypress in interactive mode:

1) Make sure the app is running on `localhost:3000`  (ie `npm run watch`)
2) `npm run cypress:open`

To just run the tests Cypress in non-interactive mode:
  
1) Make sure the app is running on `localhost:3000`   (ie `npm run watch`)
2) `npm run cy:run`

See docs for cypress here: https://www.cypress.io/

### Live Reload

To use [Browersync](https://www.browsersync.io/) to watch your files and reload
the page, inject CSS or synchronize user actions across browser instances, you
will need the `APP_ENTRY_POINT` entry in your `config.json` file:

```js
{
  "LOCAL_OWA_FOLDER": "/Users/andeladeveloper/Downloads/referenceapplication-standalone-2.8.0/appdata\\owa",
  "APP_ENTRY_POINT": "http://localhost:8081/openmrs-standalone/owa/openmrs-owa-labworkflow/index.html"
}
```
Run Browsersync as follows:

```
npm run watch
```

### Extending

Install [npm](http://npmjs.com/) packages dependencies as follows:

````sh
npm install --save <package>
````

To use the installed package, import it as follows:

````js
//import and assign to variable
import variableName from 'package';
````

To contain package in vendor bundle, remember to add it to vendor entry point array, eg.:

````js
entry: {
  app : `${__dirname}/app/js/owa.js`,
  css: `${__dirname}/app/css/owa.css`,
  vendor : [
    'package',
    ...//other packages in vendor bundle
  ]
},
````

Any files that you add manually must be added in the `app` directory.

### Troubleshooting

##### [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

You may experience problems due to the `Access-Control-Allow-Origin` header not
being set by OpenMRS. To fix this you'll need to enable Cross-Origin Resource
Sharing in Tomcat.

## Usage
Before using the Lab Workflow Application, the administrator should make the following one time configurations using the admin portal.

1. Create a setting `labworkflowowa.labResultsEntryEncounterType`.
2. Create a date format, setting `labworkflowowa.dateAndTimeFormat` as the name, with a value of the date format, e.g. `DD-MMM-YYYY HH:mm`, in the global properties

See instructions [here](http://enable-cors.org/server_tomcat.html) for Tomcat 7 and [here](https://www.dforge.net/2013/09/16/enabling-cors-on-apache-tomcat-6/) for Tomcat 6.

## License

[MPL 2.0 w/ HD](http://openmrs.org/license/)
