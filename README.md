<img src="https://cloud.githubusercontent.com/assets/668093/12567089/0ac42774-c372-11e5-97eb-00baf0fccc37.jpg" alt="OpenMRS"/>

# openmrs-owa-labworkflow

This repository contains the openmrs-owa-labworkflow OpenMRS Open Web App.

For further documentation about OpenMRS Open Web Apps see
[the wiki page](https://wiki.openmrs.org/display/docs/Open+Web+Apps+Module).

## Development

### Prerequisites

Requires [NodeJS 6+](https://nodejs.org/en/download/package-manager/).

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

This will launch [Browersync](https://www.browsersync.io/).

If no `config.json` exists, you will be prompted to edit the auto-generated one.
Adjust `APP_ENTRY_POINT` for your local server.

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
`LOCAL_OWA_FOLDER` entry in `config.json`. If you don't have a `config.json`,
this command will initialize it.

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

In order to release, set the new version number in package.json, bintray.json (also set other version information here 
like release date and vcs_tag) and app/manifest.webapp. Once you commit, push changes to github, and confirm the Travis 
tests pass, go to https://github.com/openmrs/openmrs-owa-labworkflow/releases and create a new release named after the 
version you want to release. Travis CI should pick up a newly created tag and deploy the release to Bintray at 
https://bintray.com/openmrs/owa/openmrs-owa-labworkflow

A *key thing to note* is that when releasing, Travis CI will build the  project using the version of react-components
specified in the package.json, *while the PIH staging build* always uses the latest head of react-components
when building and deploying lab workflow.  Therefore, if changes have been made to react-components since
the last lab workflow release, you will likely want to release react-components (see react-components README for
details) and upgrade the version number in the Lab Workflow package.json before releaseing Lab Workflow or you
may inadvertently release Lab Workflow with an earlier verison of React Components than you have been testing
against.


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
