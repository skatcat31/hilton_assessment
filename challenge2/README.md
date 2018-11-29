# Hilton Coding Challenge 2: Dynamic Form

Hilton Dynamic Form coding challenge.

# The Short README

If all you want to do is install, test, and run the dynamic form then you need to do the following steps:

1. navigate to the current folder with a terminal
2. run `npm install` to install all dependancies
3. run `npm test` to run the test in interactive mode
4. run `npm start` to run the development build and open a browser
5. (optional) run `npm run build` to build the module for production deployment

Otherwise following is some design decisions I made about the provided challenge and the `create-react-app` readme following.

# The README by Robert Mennell

This implimentation of the Dynamic Form challenge was done in React throuhg `react-create-app --typescript` to generate a TypeScript React project. It was then implimented with some deviations from the provided pictures.

## Requirements

Since this was built using the `create-react-app` utility and it's `--typescript` flag, the requirements are the exact same as `create-react-app`

- NodeJS 8.10.0 or later
- NPM 5.2 or later

For more information please see the [Create React App repository](https://github.com/facebook/create-react-app#create-react-app--)

## Testing Methodology

### Unit Testing
Make sure everything is tested! This shouldn't be much becasue with TypeScript it won't compile if the types don't line up, and thus you need to check for existence and proper state changing.

There are 34 unit tests. Run them and see their output with `npm run test` after you've run an npm install 1 time in the folder.

### Behaviour Driven Development
TYPE EVERYTHING! Interfaces are NOT hard to make. They should be used where applicable(everywhere).

## Deviations from Provided Picture

The provided picture did not show a checkbox on the `Room 1` box. I have decided to put a permanantly checked and disabled checkbox to show that `Room 1` will always be selected. This is helpful incase people cannot see the coloring behind the boxes too well and will give them a more defined visual confirmation of the `Room 1` selection status. It will not interact the onChange handler even if you manually fire an event. This change gives it not only a more intuitive User Experience, but also a more consistent layout. While this is not strictly dissallowed, the reasoning behind it is always good to provide.

## State Management Considerations

This could be a use case for a State Store library like Redux, but proper management of child states and bubbling handlers should allow this to be done without one.  
A State Store would garner a more useful State management flow in a fuller application since you could then use a prop identifier to tell each child what it would be storing in the state as, but with proper design vanilla ReactJS will be able to work with it just as well and will be simpler to use. Then in a full application you could adapt this to a state store by extending the type and overwriting the `submit` handler.  
In all reality if this were part of a larger application it would then want to be integrated with the global store if applicable, and since this is a simple form that should only submit on this page that is not applicable.

### Loading and Saving State

- Upon instancing(calling of constructor) of class, check local storage and load into state or load a default state.

- Upon save action of final form submission, write to local storage so next open will have same state. Because alert causes testing to fail and it should be used sparingly if at all, console.log that state has been saved

- Upon loading of state, compare with number of rooms that are supposed to exist and if any are found missing or if the state could be considered corrupted generate a new state from scratch

- If loaded state cannot be parsed recreate state and error log reason why

## Feedback

1. There are other ways to load the state from disc into the class. Why did you choose the constructor? Why not the Component Did Mount life cycle?  
If a component is not mounted the life cycle event never fires(same with component will mount), and sometimes you want to expose methods to query the state before that life cycle is fired. As such waiting until then can be too late to detect state before mounting. While a default state is possible, this means that there is a change between first query and actual mount, so reliability was a concern

2. The constructor is somewhat long. The logic to confirm and build the state could have been moved out of the constructor  
At 33 lines this is a valid concern and instead this logic should have been in a helper function that could have been expose so that other modules could confirm the state as well. This would normally lead to an issue and then Pull Request. It would have been a good example of a Static Method on the class, same with a default state building method.  
Implimented with #5

3. Some of the tests directly interacted with State. While many of the tests were good, why did these ones interact with the state instead of focusing on the DOM?  
Because the DOM should be decided from the State I thought it would be a good place to test the mirroring that DOM updates State correctly, however this strictly ties the State into the test and if implimentation changes would quickly break that test. This would normally lead to an issue and then Pull Request to update the test. It is extremely helpful critique of how little things in testing can sometimes go unnoticed.

## Running the application

Please read either [the short readme](#the-short-readme) or the [Create React App README](#create-react-app-readme)

# Create React App README
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It was generated with the TypeScript directive using `create-react-app --typescript`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
