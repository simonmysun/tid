# tid
Take It Down - yet another browser based "editor". There is a [demo page](https://simonmysun.github.io/tid/) but it's not promised to be up to date.

## Why
I need a more convinient tool to view and edit my lecture notes. But nothing satisfied me. So I write this. 

Features:
* Serve a root and I can browse everything with my browser(PDF, images, videos, audios);
* Render markdown files, and the Mathematic formulas inside it(with the grammar of $LaTeX$);
* When viewing the markdown files, there is a thumbnail, for faster navigating and preview the structure of the file;

## Install
```
npm install tid -g
```

## Usage
```
  Usage: tid [options]

  Take It Down - yet another browser based "editor"

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -B, --no-browser     do not start browser after the service started. defaults to true
    -C, --chdir [path]   change the working directory, defaults to current directory
    -c, --config [path]  set config path. defaults to ./deploy.conf
    -P, --port [n]       specify a port to use, by default the port 3000 will be used
    -w, --watch          watch file changes and automatically refresh

```

## Attention
NO security is considered. Running it as a public server is not suggested;

## TODO
See [issues](https://github.com/simonmysun/tid/issues). 