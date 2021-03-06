module.exports = function(grunt) { 
  grunt.initConfig({ 
    pkg: grunt.file.readJSON('package.json') ,
    jshint: {
      files: ['js/**/*.js', 'test/unit/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        noempty: true,
        quotmark: "single",
        //quotmark: true,
        undef: true,
        predef: ["localStorage", "module"],
        unused: true,
        strict: true,
        maxcomplexity: 4
      }
    },
    plato: {
      plato_report: {
        // options : {
        //   jshint : false
        // },
        files: {
        'report': ['js/**/*.js', 'test/unit/*.js']
        }
      }
    },
    karma: {
      unit: {
        configFile: 'test/config/karma.conf.js'
      }
    },
    jasmine: {
      src: ['app.js', 'js/**/*.js'],
      options: {
        specs: 'test/unit/*Spec.js',
        vendor: [
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'test/lib/angular-mocks.js'],
        template: require('grunt-template-jasmine-istanbul'),
        templateOptions: {
          coverage: 'test/coverage/coverage.json',
          report: [
            {type:'html',options: {dir: 'test/coverage/html'}},
            {type:'text',options: {dir: 'test/coverage/text/'}},
            {type:'text-summary'}
          ],
          thresholds: {
            lines: 75,
            statements: 75,
            branches: 75,
            functions: 75
          }
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['js/app.js', 'js/controllers/*.js',
          'js/directives/*.js', 'js/services/*.js'],
        dest: 'build/output.min.js'
      }
    },
    concat: {
      options: {
        separator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */ \n',
      },
      dist: {
        src: ['js/app.js', 'js/controllers/*.js',
          'js/directives/*.js', 'js/services/*.js'],
        dest: 'build/output.js'
      }
    },

    watch: {
      files: ['js/app.js', 'js/controllers/*.js',
        'js/directives/*.js', 'js/services/*.js'],
      tasks: ['jshint']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('metrics', ['jshint', 'plato']);
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('build', ['jasmine', 'uglify']);

  grunt.registerTask('all', ['metrics', 'build']);
};
