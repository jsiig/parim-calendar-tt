# PARiM Test Task - Folk Calendar

* React + Redux + Typescript
* Deployed to https://parim-test-task.siig.ee/ (S3 Static Website Hosting + 
CloudFlare CDN with SSL)

## Approaches, etc.

* Design mockup I created in Figma before starting work has been attached in a
zip file. 
* Uses ionicons via CDN, had to enable/ignore `<ion-icon />` in Typescript.
* Uses `dayjs` instead of `moment` library for modularity (smaller bundle).
* OK, doing a POST request to fetch data is weird. So is supplying a JSON body
to a GET request. I had to choose one, as the API didn't work with QueryString
params for the request; and since my library of choice - axios - does not play
nice with GET + JSON body, I chose the POST path.
* I haven't worked with TypeScript, React or Redux in over 6 months now.
[This is the guide I used to get started again.](https://levelup.gitconnected.com/set-up-a-typescript-react-redux-project-35d65f14b869)
* At the time of writing this README, I haven't added any runtime PropTypes.

## Potential future improvements
* React router with browserHistory for back button navigation (might be a bad
idea from a UX perspective - do we want to fill up user's history on each page
nav? We'd need a proper datepicker.)
* Tests for store actions.
* More component tests than just for a single component.
* Runtime PropTypes - Typescript is only helpful at compile-time.
* Refactor - I feel this is somewhat messier code than what I usually write,
it may be down to the fact that I'm more used to the Vue ecosystem nowadays.
* Figure out a couple of Typescript issues when dispatching redux-thunk
action from another redux-thunk action.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`
Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
The app is ready to be deployed!
