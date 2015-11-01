# temple-loader

A [`temple`](https://github.com/KosyanMedia/temple) template loader for [`webpack`](https://github.com/webpack/webpack).

## General Usage

### webpack configuration

```javascript
{
  ...
  module: {
    loaders: [
      ...
      { test: /\.temple/, loader: "temple-loader" }
    ]
  }
}
```

### Your JS making use of the templates

```javascript
var template = require("./file.temple");
// => returns file.temple content as a template function
```

See [`webpack`](https://github.com/webpack/webpack) documentation for more information regarding loaders.

