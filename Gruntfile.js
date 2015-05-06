'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
    watch: {
      jshint: {
        files: [
            '*.js',
            'lib/*.js',
            'features/step_definitions/*.js',
            'features/*.feature'
        ],
        tasks: ['shell']
      }
  	},
  	shell: {
      options: {
        stderr: false
      },
      target: {
        command: 'npm test'
      }
    }
  });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', ['watch']);
};
