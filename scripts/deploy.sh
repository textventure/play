#!/bin/bash

# make sure working index is clean
stash_output=$(git add . && git stash)

# run lint and tests first
npm run lint && npm test

# remove `build` directory and build production bundle
npm run clean && npm run build

# deploy contents in `build` to remote branch `master`
if [[ $(command -v npx) ]]; then
  npx --no-install gitploy build master
else
  $(npm bin)/gitploy build master
fi

# pop saved stash (if applicable)
if [[ $stash_output != 'No local changes to save' ]]; then
  git stash pop
fi
