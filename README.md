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
```files_list.temple
<div>
  <forall name="files" key="files">
    <div>{{name}}
  </forall>
<div>
```
```javascript
var temple_utils = require('temple-wat');
var template = require("./files_list.temple");
var pool = temple_utils.pool(template);
var data = {
  files: [{name: 'foo'}]
};
var temple_data = pool.get('files_list'); // => returns file.temple content as a temple obj
document.body.appendChild(temple_data[0]);
temple_data.update(data);
```

See [`webpack`](https://github.com/webpack/webpack) documentation for more information regarding loaders.

