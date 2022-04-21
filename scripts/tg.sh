#!/bin/bash

# Send APK with telegram bot

source "${PWD}/scripts/version.sh"

VERSION=$(get-version)

APK_FNAME="${PWD}/android/app/build/outputs/apk/release/app-release.apk"

# Send through telegram
tg-send-file ${APK_FNAME} -t "worktime v${VERSION}" -to 1000
