import { Actor } from "apify";

import replicate from "node-replicate";

// this is ESM project, and as such, it requires you to specify extensions in your relative imports
// read more about this here: https://nodejs.org/docs/latest-v18.x/api/esm.html#mandatory-file-extensions
// import { router } from './routes.js';

// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init().
await Actor.init();

// Structure of input is defined in input_schema.json
const input = await Actor.getInput();
const { prompt, model, options } = input

const response = await replicate.run(model, { prompt, ...options })

console.log(response)

// Save headings to Dataset - a table-like storage.
await Actor.pushData({ response: JSON.parse(JSON.stringify(response)) });

// Gracefully exit the Actor process. It's recommended to quit all Actors with an exit().
await Actor.exit();
