#!/bin/bash

set -e;

echo 'Clearing';
rm -r ./static/* || true;
webpack --config ./build/webpack.config.js --progress --colors --optimize-minimize;
rm ./static/scripts.js.map;
echo 'Copying static files';
cp -r ./src/frontend/static/* ./static/;
