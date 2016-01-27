var gulp = require('gulp');
var bs = require('browser-sync').create();
var harp = require('harp');

gulp.task('serve', function() {

  harp.server(__dirname + '/src', {
    port: 9000
  }, function() {

    bs.init({
      proxy: "localhost:9000",
      open: false
    });

    gulp.watch([
      "./**/*.css",
      "./**/*.sass",
      "./**/*.scss",
      "./**/*.less",
      "./**/*.styl"
    ], function() {
      bs.reload("main.css", {
        stream: true
      });
    });

    gulp.watch([
      "./**/*.html",
      "./**/*.md",
      "./**/*.ejs",
      "./**/*.jade",
      "./**/*.js",
      "./**/*.json",
      "./**/*.coffee"
    ], function() {
      bs.reload();
    });

  });

});

gulp.task('default', ['serve']);
