# PARiM Test Task - Folk Calendar

* React + Redux + Typescript
* Deployed to https://parim-test-task.siig.ee/.
* Hosted on S3 + free CloudFlare CDN with SSL.

## Approaches, etc.

* Design mockup I created in Figma before starting work has been attached in a
zip file. 
* Uses ionicons via CDN, had to enable/ignore `<ion-icon />` in Typescript.
* 
* OK, doing a POST request to fetch data is weird. So is supplying a JSON body
to a GET request. I had to choose one, as the API didn't work with QueryString
params for the request; and since my library of choice - axios - does not play
nice with GET + JSON body, I chose the POST path.
* So, I haven't worked with TypeScript, React or Redux in over 6 months now.
[This is the guide I used to get started again.](https://levelup.gitconnected.com/set-up-a-typescript-react-redux-project-35d65f14b869)
* At the time of writing this README, I haven't added any tests or runtime
PropTypes.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
