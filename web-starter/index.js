'use strict';
var generators = require('yeoman-generator'),
  _ = require('lodash'),
  pkg = require('../package.json'),
  Promise = require('bluebird'),
  glob = Promise.promisify(require('glob'));

module.exports = generators.Base.extend({
  initializing : {
    async : function() {
      this.options.addDevDependency(pkg.name, '~' + pkg.version);
    }
  },
  
  
  prompting : function() {
    var that = this;
    var php_versions = ['5.3','5.6'];
    var mysql_versions = ['5.6'];
    var config = _.extend({
      // Put default config values here
      php_base : '5.3',
      mysql_base : '5.6',
      mysql_password : 'web',
    }, this.config.getAll());
    
        return that.prompt([{
          // Put config prompts here
            type : 'list',
            name : 'php_base',
            choices : php_versions,
            message : 'Select a version of PHP',
            default : config.php_base,
          },
          {
          // Put config prompts here
            type : 'list',
            name : 'mysql_base',
            choices : mysql_versions,
            message : 'Select a version of MySQL',
            default : config.mysql_base,
          },
          {
            type: 'input',
            name: 'mysql_password',
            message: 'Input desired mysql password:',
            default: config.mysql_password,
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
    salt : function() {
          var that = this;
          var config = this.config.getAll();
        },
        aliases : function() {
          console.log('writing:aliases');
        },
        make : function() {
          console.log('writing:make');
        },
        settings : function() {
          // Get current system config for this sub-generator
          var config = this.config.getAll();
          //_.extend(config, this.options.parent.answers);
          
          /*
          this.fs.copyTpl(
            this.templatePath('salt'),
            this.destinationPath('salt'),
            config
          );
          */
          var that = this;

          glob('**', { cwd : this.templatePath(''), dot: true}).then(function(files) {
            _.each(files, function(file) {
              that.fs.copyTpl(that.templatePath(file), that.destinationPath(file), config);
            });
            
          });
          /*
          this.fs.copyTpl(
                  this.templatePath('salt/roots/pillars/generated.sls'),
                  this.destinationPath('salt/roots/pillars/generated.sls'),
                  config
                );
                */
          
        }
      }
});
