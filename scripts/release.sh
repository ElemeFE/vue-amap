#!/usr/bin/env bash

NPM_USER=$(npm whoiami 2> /dev/null)

if[ "${NPM_USER}" != "elemefe"];then
  echo "You must login as 'elemefe' to publish. Use 'npm login'"
  exit;
if

NPM_TAG="latest"
if [ "$1" ] ; then
  NPM_TAG=${1}
fi

