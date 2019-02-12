# Pong Game

## Table of Contents
1. Purpose
2. Setup
3. Controls
4. Functionality
5. Technologies used
6. File structure

## Purpose
The purpose is to create a basic pong game created using vanilla Javascript and SVGS with Object Oriented Programming in mind.

## Setup

**Install dependencies:**

`> npm i`

**Run locally with Webpack Dev Server:**

`> npm start`

**Build for production:**

`> npm run build`

## Keys

**Player 1:**
* a: up
* z: down

**Player 2:**
* ▲: up
* ▼: down

**Other**
spacebar: pause

## Functionality
1. Press spacebar to start the game. You can individually move the paddles to play a simple game of pong.

2. Upon contact with the walls, the ball will bounce keeping the same x-axist vector but opposite y-axis vector.

3. Upon contact with the paddles, the ball will detect where it hit the paddle and change it's vectors accordingly along with a burst of speed. Against the ball vector will decrease it's y-axis vector, whereas with the ball vector will increase it.

4. The ball will decelerate as it travels along the board until it reaches a base speed that it won't go any lower.

5. The paddles have added smooth movement. The game can detect mutliple keydowns rather than just a single one.

## Technologies Used
1. NPM package manager: [NPM](https://www.npmjs.com/)
2. Yarn package manager: [Yarn](https://yarnpkg.com/en/)
3. Webpack Bundler: [Webpack](https://webpack.js.org/)

## File Structure
1. NPM packages, webpack config, and eslint rules are located in the root directory
2. 'src' is the working directory containing uncompressed code and assets
3. 'build' is the distribution directory containing compressed, bundled, and ready-for-deployment code and assets for maximum performance
4. Base javascript classes will be found directly in src, partials for classes containing specific parts of the game are in partials.
