#!/bin/bash

# Commit and (optionally) tag with new version

set -e # Exit on fail

source "${PWD}/scripts/version.sh"

VERSION=$(get-version)

if [[ $1 == "--tag" ]]; then
  shift
  tag="true"
fi

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
if [ -n "$tag" ]; then
  tag_msg="$extra"
  if [ -z "${tag_msg}" ]; then
    tag_msg="Version $VERSION"
  fi
  git tag -a $version -m "${tag_msg}"
fi
