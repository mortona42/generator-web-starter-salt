'use strict';
var generators = require('yeoman-generator'),
  _ = require('lodash'),
  pkg = require('../package.json'),
  Promise = require('bluebird');

module.exports = generators.Base.extend({
  initializing : {
    async : function() {
      this.options.addDevDependency(pkg.name, '~' + pkg.version);
    }
  },
  prompting : function() {
    var that = this;
    var config = _.extend({
      // Put default config values here
    }, this.config.getAll());

    return this.prompt([
      // Put config prompts here
    ])
    .then(function(answers) {
      that.config.set(answers);

      answers.config = {};
      // Expose the answers on the parent generator
      _.extend(that.options.parent.answers, { 'web-starter-salt' : answers });
    });
  },
  writing : {
    // Put functions to write files / directories here
  }
});
