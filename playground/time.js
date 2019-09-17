var moment = require('moment');

// var date = moment();
// date.add(1, 'years')
// console.log(date.format('MMM Do, Y'));

// var date = moment();
// console.log(date.format('h:mm a'));  ///385


// we can do is we can create timestamps with Moment, 
// it has the exact same effect as the new Date().getTime method
// we've used

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

