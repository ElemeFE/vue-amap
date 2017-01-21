#! /bin/sh
if [ "$GITHUB_TOKEN" ]; then
  cd docs
  rm -rf .git
  git init
  git checkout -b gh-pages
  git add .
  git -c user.name='travis' -c user.email=$NPM_EMAIL commit -m "update: docs-branch"
  git push -f -q https://$GITHUB_TOKEN:x-oauth-basic@github.com/ElemeFE/vue-amap.git gh-pages &2>/dev/null
  cd ..
fi
