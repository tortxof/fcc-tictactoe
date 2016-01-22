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
      "./**/*.less"
    ], function() {
      bs.reload("main.css", {
        stream: true
      });
    });

    gulp.watch([
      "./**/*.html",
      "./**/*.ejs",
      "./**/*.jade",
      "./**/*.js",
      "./**/*.json",
      "./**/*.md"
    ], function() {
      bs.reload();
    });

  });

});

gulp.task('default', ['serve']);
