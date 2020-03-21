# REVIEW: maybe gradle is better for this?
VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

WORKING_DIR=$(pwd)
APK_FNAME="${WORKING_DIR}/android/app/build/outputs/apk/release/app-release.apk"

# Send through telegram
tg-send-file ${APK_FNAME} -t "worktime v${VERSION}"

# TODO: upload release to github
