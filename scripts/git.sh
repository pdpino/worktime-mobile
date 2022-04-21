#!/bin/bash

# Commit and tag with new version

set -e # Exit on fail

source "${PWD}/scripts/version.sh"

VERSION=$(get-version)

## Commit and tag stuff
git add .

# Commit
version="v${VERSION}"
commit_msg="${version}"
extra=$*
if [ -n "$extra" ]; then
  commit_msg="${commit_msg} $extra"
fi
git commit -m "${commit_msg}"

# Tag
tag_msg="$extra"
if [ -z "${tag_msg}" ]; then
  tag_msg="Version $VERSION"
fi
git tag -a $version -m "${tag_msg}"
