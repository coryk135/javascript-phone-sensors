module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['Gruntfile.js', 'index.html', 'scripts/**/*.js', '*.html'],
      options: {
          livereload: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
}
