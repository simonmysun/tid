# tid
Take It Down - yet another browser based "editor". There is a [demo page](https://simonmysun.github.io/tid/) but it's not promised to be up to date. 

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

## TODO
* Fix bugs;
* Scroll sync(according to the content);
* Faster previewing or less lagging;
* Print / to PDF conversion support;
* UML diagram support;
* Realtime;
* Tests;
* Compatible support for very large document;
* Single file hosting;
* More file extensions(What the browser cannot do: codes, etc. or maybe `child_process.exec('xdg-open file'))`;
* Auto refresh support when file changed(Client asking for hash sum or server push notifications?);