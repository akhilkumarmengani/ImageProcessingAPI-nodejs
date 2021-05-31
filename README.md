# Image Processing API
As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing and serving stored images for you.

## Installation
***
A little intro about the installation. 
```
$ npm init -y

$ npm i --save-dev @types/express @types/jasmine @types/morgan @types/node @types/sharp @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier nodemon prettier sharp
   
$ npm i express jasmine jasmine-spec-reporter morgan

```
## Scripts

### Start Application
$ npm run start

### Build Application
$ npm run build

### Build and Test Specs
$ npm run test

### Prettier
$ npm run prettier

### ESLint
$ npm run lint

