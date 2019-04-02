A minimilistic sample with servers built in both NestJS (not NextJS) and ExpressJS and an implemented webpack middleware.

1. Run following commands in both the folders
```
$ npm install
$ npm build
```

2. Update `ui/index.js` to select which server to use

3. Make a empty folder anywhere on system, cd into it, and run
```
$ node path/to/ui/index.js
```

4. Send the following POST request to `api/init` to scaffold defaults
```
{
    "type": "defaults"
}
```

The response would have a value prop as `true` and `webpack` prop as text of config at root (will be replaced with ast)!!