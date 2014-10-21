
'use strict';
/**
 * Date      : 2014/10/20
 * copyright : (c) hustcer
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      options: {
        // format: require('eslint-stylish')
      },
      node: {
        options: {
          config: 'eslint.json'
        },
        files: {
          src: ['Gruntfile.js', 'bin/inq', 'lib/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('check'  , ['eslint']);
  grunt.registerTask('default', ['eslint']);

};
