#!/bin/bash
set -e

echo 'Clearing';
rm -r ./static/* || true;
webpack --config ./build/webpack.config.js --progress --colors;
echo 'Copying static files';
cp -r ./src/frontend/static/* ./static/;

npm run serve-dev;
