#! /bin/sh
if [ "$GITHUB_TOKEN" ]; then
  cd docs
  git init
  gco -b
  git checkout -b gh-pages
  git add .
  git -c user.name='travis' -c user.email=$NPM_EMAIL commit -m "update:docs"
  git push -f -q https://$GITHUB_TOKEN@git@github.com:ElemeFE/vue-amap.git gh-pages &2>/dev/null
  cd ..
if
