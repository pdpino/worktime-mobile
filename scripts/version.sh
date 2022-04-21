#!/bin/bash

# Extracts the version from package.json

get-version() {
  echo $(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | sed -e 's/^[[:space:]]*//') # Trim leading whitespace
}