#!/bin/bash

# babel transform for flow, es2015 syntax, jsx, rest syntax
npm run babel -- js/ -d bin

# clientside require
npm run browserify -- bin/index.js -o bin/bundle.js
