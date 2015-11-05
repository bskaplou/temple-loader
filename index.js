var loaderUtils = require("loader-utils");
var DOMParser = require('xmldom').DOMParser;
var builder = require('temple-wat/code_generator');
var node = require('temple-wat/xml2instructions');

module.exports = function (content) {
  this.cacheable();
  var name = loaderUtils.interpolateName(this, "[name]", {content: content});
  var parser = new DOMParser();
  var templates = {};
  //TODO: add params support
  var classes_preffix = '';
  var no_modify_regex = /js/;
  var drop_spaces = true;

  function collector(ins, source, arg1, arg2, arg3) {
    if (!templates.hasOwnProperty(source)) {
      templates[source] = [];
    }
    if (ins === 'node') { //Nodes go up
      templates[source].unshift([ins, arg1, arg2]);
    } else { // Other down
      templates[source].push([ins, arg1, arg2, arg3]);
    }
  }

  if (drop_spaces) {
    content = content.replace(/>\s+</g, '><');
  }

  node(name, 'root', parser.parseFromString(content), collector);

  var templates_code = [];
  for (var k in templates) {
    if (templates[k].length > 1) //Ignore stop instruction
      templates_code.push('"' + k + '"' + ': function(pool){' + builder(templates[k], classes_preffix, no_modify_regex) + '}');
  }
  return 'var temple_utils = require("temple-wat");' +
    'module.exports = { ' + templates_code.join(',') + '};';
};
