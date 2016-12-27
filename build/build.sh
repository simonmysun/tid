#!/bin/bash

set -e;

echo 'Clearing';
rm ./static/* || true;
webpack --config ./build/webpack.config.js --progress --colors;
echo 'Copying viewer.html';
cp ./src/frontend/viewer.html ./static/viewer.html;
