var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    fs    = require('fs'),
    csv  = require("csvtojson").Converter,
    request = require('request')

    gulp.task('default', function(cb) {
      request('http://data.hdx.rwlabs.org/dataset/6992403a-d9dc-4962-b97e-c30abd1feefc/resource/aec5d77d-095a-4d42-8a13-5193ec18a6a9/download/country-boundingboxes.csv')
        .pipe(new csv({fork:true, toArrayString:true}))
        .pipe(fs.createWriteStream('./lib/country-boundingboxes.json'))
        .on('finish', function() {
          cb()
        })
    })
