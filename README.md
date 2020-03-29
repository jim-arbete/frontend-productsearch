#  Frontend Client  - Product listing from ElasticSearch with Frontend in: React, Typescript, react-async

## Installation Prerequisites
1. Install Node.js version 12.16.1 or later `https://nodejs.org/en/download/`. 

## Installation

```bash
$ git clone https://github.com/jim-arbete/frontend-productsearch.git productlistingfrontend
$ cd productlistingfrontend
$ npm install
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Build => Production server

Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.

1. Try out the build with npm serve. 
2. Install serve `npm i serve -g`
3. And run:
```bash
$ cd build/productlistingfrontend
$ serve -l 5000
```