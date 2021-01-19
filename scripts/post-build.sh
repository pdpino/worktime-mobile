## Post-build script
##
## 1. Sends the generated apk through Telegram
## 2. Applies git commit and git tag

# Exit on fail
set -e

# REVIEW: maybe gradle is better for this?
VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | sed -e 's/^[[:space:]]*//') # Trim leading whitespace

WORKING_DIR=$(pwd)
APK_FNAME="${WORKING_DIR}/android/app/build/outputs/apk/release/app-release.apk"

# Send through telegram
tg-send-file ${APK_FNAME} -t "worktime v${VERSION}" -to 1000


## Commit and tag stuff
git add .

# Commit
version="v${VERSION}"
commit_msg="${version}"
extra=$1
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


# TODO: upload release to github?
