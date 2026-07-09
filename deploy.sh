#!/usr/bin/env bash

git fetch origin main
git reset --hard origin/main
npm run build
