'use strict';

// Take the csv files and convert them to standard format

var path = require('path');
var _ = require('underscore');
var csv = require('csv');
var fs = require('fs');
//var cbb = require('../lib/country-boundingboxes.json');
var execSync = require('child_process').execSync;

var firstHeader = process.argv[2];


var output = [];

// read in the CSV
var input = process.stdin;



var parser = csv.parse({"columns": true});


parser.on('readable', function () {
  var record = null;
  while(record = parser.read()){
     output.push(record);
  }
});

parser.on('finish', function(){

  for ( var i = 0 ; i < output.length ; i++ ) {
    output[i].bounds = ""
    output[i].subunits = ""
    var c = JSON.parse(execSync('python3 '+__dirname+'/bounds.py '+output[i].alpha2))
    //console.log('python3 '+__dirname+'/bounds.py '+output[0].alpha2, c)
    if ( c.subunits.length ) {
      if ( c.subunits.length > 1 ) {
        output[i].subunits = c.subunits.join(',');
        output[i].bounds = JSON.stringify(c.bounds).replace(/\],\[/g, ';').replace(/(^\[\[?|\]?\]$)/g, '');
      }
      else output[i].bounds = c.bounds[0].join(',');
    }
  }

  output = _.sortBy(output, function (i) { return i[firstHeader].toLowerCase();} );

  var headers = _.keys(output[0]);
  var remaining = _.without(headers, firstHeader);
  var columns = _.flatten([firstHeader, remaining.sort()]);
  // console.warn(columns);

  csv.stringify(
    output,
    { "header":true, "columns": columns },
    function(err, string){ process.stdout.write(string) }
  );

});

input.pipe(parser);
