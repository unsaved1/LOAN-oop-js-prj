"use strict";

const gulp = require("gulp");
const browsersync = require("browser-sync");

//стандартный
const dist = "./dist/";

// для локального сервера
// const dist = "C:/Program Files/OSPanel/domains/oop-js";

gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});


gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*")
          .pipe(gulp.dest(dist + "/assets"))
          .on("end", browsersync.reload);
});


gulp.task("webpack", () => {
    return gulp.src("./src/js/**/*")
          .on("end", browsersync.reload);  
})



gulp.task("watch", () => {
    browsersync.init({
		server: {
			baseDir: './dist/',
			serveStaticOptions: {
				extensions: ['html']
			}
   		},
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/*.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*", gulp.parallel("webpack"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "webpack"));
gulp.task("default", gulp.parallel("watch", "build"));