var fs = require('fs');
var parser = require('ass-parser');
var subA = parser(fs.readFileSync(__dirname + '/eng.ssa', 'utf8'), {comments: true});
var subB = parser(fs.readFileSync(__dirname + '/ja.ass', 'utf8'), {comments: true});

var timecode = {
  fromFloat: function() {},
  toFloat: function(timecodeFormat) {
    console.log(timecodeFormat);
    var regx = timecodeFormat.match(/(\d+):(\d{1,2}):(\d{1,2})\.(\d{1,2})/);
    var hours        = parseInt(regx[1]) * 60 * 60 * 100,
        minutes      = parseInt(regx[2]) * 60 * 100,
        seconds      = parseInt(regx[3]) * 100,
        milliseconds = parseInt(regx[4]);
    return (hours + minutes + seconds + milliseconds) / 100;
  },
  diff: function(one, two) {
    return Math.abs(this.toFloat(one) - this.toFloat(two)).toFixed(2);
  }
}


// +-------------------------------+
// |             Main              |
// +-------------------------------+

var reSubA = [];

for (var i in subA[2].body) {
  if (i == 0) continue;
  console.log(i);
  reSubA.push({
    start: subA[2].body[i].value.Start,
    end: subA[2].body[i].value.End,
    duration: timecode.diff(subA[2].body[i].value.Start, subA[2].body[i].value.End),
    // preMargin: (function() {
    //   if (parseInt(i) > 1 
    //     && subA[2].body[ i ].hasOwnProperty('value') 
    //     && subA[2].body[ i ].value.Start !== undefined 
    //     && subA[2].body[i-1].hasOwnProperty('value') 
    //     && subA[2].body[i-1].value.End !== undefined) {
    //       return timecode.diff(subA[2].body[ i ].value.Start, subA[2].body[i-1].value.End);
    //   } 
    //   else {return null;}
    // })(),
    postMargin: (function() {
      console.log(i, i+1, subA[2].body.length, subA[2].body.length-1);
      if (parseInt(i)+1 < subA[2].body.length-1 
        && subA[2].hasOwnProperty('body')
        && subA[2].body !== undefined
        && subA[2].body[i+1].hasOwnProperty('value') 
        && subA[2].body[i+1].value.Start !== undefined 
        && subA[2].body[ i ].hasOwnProperty('value') 
        && subA[2].body[ i ].value.End !== undefined) {
          // console.log('HERE: ', subA[2].body[i+1].value.Start, subA[2].body[i+1].value.End);
          return timecode.diff(subA[2].body[i+1].value.Start, subA[2].body[i].value.End);
      } 
      else {return null;}
    })(),
    // preMargin: parseInt(i) <= 1 ? null :
    //   timecode.diff(
    //     subA[2].body[ i ].value.Start, 
    //     subA[2].body[i-1].value.End),
    // postMargin: parseInt(i)+1 >= subA[2].body.length ? null :
    //   timecode.diff(
    //     subA[2].body[i+1].value.Start, 
    //     subA[2].body[ i ].value.End),
    text: subA[2].body[i].value.Text
  })
  console.log(reSubA[reSubA.length-1], subA[2].body.length);
}

// console.log(subA[2].body[5].value);
// console.log(timecode.diff(subA[2].body[5].value.Start, subA[2].body[5].value.End));