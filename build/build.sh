#!/bin/bash

set -e;

echo 'Clearing';
rm -r ./static/* || true;
webpack --config ./build/webpack.config.js --progress --colors --optimize-minimize;
rm ./static/_scripts.js.map || true;
echo 'Copying static files';
cp -r ./src/frontend/static/* ./static/;
