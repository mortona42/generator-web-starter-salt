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
    var tags = ['5.6','7.0'];
    var config = _.extend({
      // Put default config values here
      php_version : '5.6'
    }, this.config.getAll());
    
        return that.prompt([{
          // Put config prompts here
            type : 'list',
            name : 'php_version',
            choices : tags,
            message : 'Select a version of PHP',
            default : config.php_version,
          },
        ])
    .then(function(answers) {
      that.config.set(answers);

      //answers.config = {};
      // Expose the answers on the parent generator
      _.extend(that.options.parent.answers, { 'web-starter-salt' : answers });
    });
  },
  writing : {
    // Put functions to write files / directories here
    php : function() {
          var that = this;
          var config = this.config.getAll();

          if (config.install_php) {
            // Create a Promise for remote downloading
            return this.remoteAsync('php', 'php', config.php_version)
            .bind({})
            .then(function(remote) {
              this.remotePath = remote.cachePath;
              return glob('**', { cwd : remote.cachePath });
            })
            .then(function(files) {
              var remotePath = this.remotePath;
              _.each(files, function(file) {
                that.fs.copy(
                  remotePath + '/' + file,
                  that.destinationPath('public/' + file)
                );
              });
            });
          }
        },
        aliases : function() {
          console.log('writing:aliases');
        },
        make : function() {
          console.log('writing:make');
        },
        settings : function() {
          // Get current system config for this sub-generator
          var config = this.options.parent.answers['web-starter-drupal'];
          _.extend(config, this.options.parent.answers);
          
          this.fs.copyTpl(
            this.templatePath('salt'),
            this.destinationPath('salt'),
            config
          );
        }
      }
});
