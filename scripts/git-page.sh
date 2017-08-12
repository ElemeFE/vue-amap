#! /bin/sh
if [ "$GITHUB_TOKEN" ] && [ "$TRAVIS_PULL_REQUEST" = false ] && [ "$TRAVIS_BRANCH"x = "master"x] ; then
  echo "---- deploy  doc branch ----"
  cd docs
  rm -rf .git
  git init
  git checkout -b gh-pages
  git add .
  git -c user.name='travis' -c user.email=$NPM_EMAIL commit -m "update: docs-branch"
  git push -f https://$GITHUB_TOKEN:x-oauth-basic@github.com/ElemeFE/vue-amap.git gh-pages
  cd ..
fi
