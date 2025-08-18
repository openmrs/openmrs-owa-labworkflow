<img src="https://cloud.githubusercontent.com/assets/668093/12567089/0ac42774-c372-11e5-97eb-00baf0fccc37.jpg" alt="OpenMRS"/>

# openmrs-owa-labworkflow

This repository contains the openmrs-owa-labworkflow OpenMRS Open Web App.

For further documentation about OpenMRS Open Web Apps see
[the wiki page](https://wiki.openmrs.org/display/docs/Open+Web+Apps+Module).

## Development

### Prerequisites

Requires [NodeJS 14](https://nodejs.org/en/download/package-manager/).

(In our GitHub actions CI we are currently building using Node 14; when building against Node 16 our tests are hanging, and we've yet to debug this)

### Setup

```sh
npm install
```

If developing on `@openmrs/react-components` at the same time, run `npm link` from
that repository, and then `npm link @openmrs/react-components` in this one.

### Developing

With an OpenMRS server running locally, run

```sh
npm run watch
```



This will build and deploy the app to the `owa` directory in your server's
application data directory and launch [Browersync](https://www.browsersync.io/). Your application data directory must be set using the
`LOCAL_OWA_FOLDER` entry in `app/config.json`. If you don't have a `config.json`,
you will need to create one in the `app` directory.  See `app/test-config.json` as an example. Adjust APP_ENTRY_POINT for your local server.


### Production Build

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

This will build and deploy the app to the `owa` directory in your server's
application data directory. This must be set using the
`LOCAL_OWA_FOLDER` entry in `app/config.json`. If you don't have a `config.json`,
you will need to create one in the `app` directory.  See `app/test-config.json` as an example. Adjust APP_ENTRY_POINT for your local server.

## Running Cypress tests

Copy `cypress.env.json.sample` to `cypress.env.json` and adjust the values as
needed to work with your local OpenMRS server.

You must have an OpenMRS server running. Run the OWA development server with `npm run watch`.

Use `npm run cypress:open` for interactive mode, or `npm run cy:run` for non-interactive mode.

See [docs for Cypress](https://www.cypress.io/).

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

## Releasing

Releasing is done via Github Releases.  The process is as follows:

1. Update the version number in package.json, pom.xml, and app/manifest.webapp by removing the "-SNAPSHOT" in each.  Ensure all 3 versions match.
2. Commit and push to master and confirm everything builds successfully in Github Actions
3. Go to the [Releases Page](https://github.com/openmrs/openmrs-owa-labworkflow/releases) and create a new release named after the version you want to release, publish this.
4. Confirm that the [Deploy release](https://github.com/openmrs/openmrs-owa-labworkflow/actions/workflows/release.yml) job completes successfully
5. Confirm that the zip artifact has been successfully published to the [Maven repository](https://openmrs.jfrog.io/ui/repos/tree/General/owa%2Forg%2Fopenmrs%2Fowa%2Flabworkflow)
6. Update the version number in package.json, pom.xml, and app/manifest.webapp, by incrementing to the next version number and adding a "-SNAPSHOT" suffix
7. Commit and push to master, and confirm that the next SNAPSHOT builds successfully

Because of the tight coupling on react-components, it is strongly recommended that prior to releasing labworkflow that
the dependency on react components is updated to reflect an actual released version rather than the "next" tag.  Ideally
this version is an official release, but could also be a pre-release.  Then, following the labworkflow release, one should update
 the dependency back to the "next" version to ensure the latest updates are incorporated in the next snapshot development.

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

