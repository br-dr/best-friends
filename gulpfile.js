var gulp = require('gulp');

// gulp.task('default', function() {
//   // place code for your default task here
// });

gulp.task('copy', function () {
    gulp.src('./client/index.html')
        .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['copy']);