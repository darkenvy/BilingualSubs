var fs = require('fs');
var parser = require('ass-parser');
var subA = parser(fs.readFileSync(__dirname + '/eng.ssa', 'utf8'), {comments: true});
var subB = parser(fs.readFileSync(__dirname + '/ja.ass', 'utf8'), {comments: true});

var timecode = {
  fromFloat: function() {},
  toFloat: function(timecodeFormat) {
    var regx = timecodeFormat.match(/(\d+):(\d{1,2}):(\d{1,2})\.(\d{1,2})/);
    var hours        = parseInt(regx[1]) * 60 * 60 * 100,
        minutes      = parseInt(regx[2]) * 60 * 100,
        seconds      = parseInt(regx[3]) * 100,
        milliseconds = parseInt(regx[4]);
    return (hours + minutes + seconds + milliseconds) / 100;
  },
  diff: function(one, two) {
    return Math.abs(one - two).toFixed(2);
  },
  center: function(start, end) {
    return (parseFloat(
          ((parseFloat(end) - parseFloat(start))/2).toFixed(2))
          + parseFloat(start)).toFixed(2);
  },
  isBetween: function(start, end, query) {
    var t = (query > start && query <= end) ? true : false;
    // console.log('t: ', t, start, query, end);
    return t
  }
}


// +-------------------------------+
// |             Main              |
// +-------------------------------+

// Subtitles where the center isn't coinside with another sub, are ignored.

var reSub = [];

for (var i in subA[2].body) {
  if (i == 0 || !subA[2].body[i].hasOwnProperty('value')) continue;
  var current = subA[2].body[i],
      start   = timecode.toFloat(current.value.Start),
      end     = timecode.toFloat(current.value.End),
      text    = current.value.Text;
  reSub.push({
    start: start,
    end: end,
    duration: timecode.diff(start, end),
    text1: text,
    text2: null
  })
  // console.log(reSub[reSub.length-1], subA[2].body.length);
}

var previousFind = 0;
for (var i in subB[2].body) {
  if (i == 0 || !subB[2].body[i].hasOwnProperty('value')) continue;
  var current = subB[2].body[i],
      start   = timecode.toFloat(current.value.Start),
      end     = timecode.toFloat(current.value.End),
      center  = timecode.center(start, end),
      text    = current.value.Text;
  if (center == 0.00 || (!text && text.length == 0) ) continue;

  for (var j = previousFind; j < reSub.length; j++) {
    if (timecode.isBetween(reSub[j].start, reSub[j].end, center)) {
      reSub[j].text2 = text;
      previousFind = j;
      break;
    }
  }

  console.log(reSub);



}

// console.log(subA[2].body[5].value);
// console.log(timecode.diff(subA[2].body[5].value.Start, subA[2].body[5].value.End));