#!/bin/bash
rm -rf out || exit 0;
mkdir out;
node build.js
( cd out
 git init
 git config user.name "Travis-CI"
 git config user.email "jerry_ii@outlook.com"
 cp ../CNAME ./CNAME
 cp ../countryiso.js ./countryiso.js
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
