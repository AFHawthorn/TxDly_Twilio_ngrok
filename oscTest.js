/* eslint-disable no-console */

'use strict';
var osc = require('node-osc');

// const client = new Client('127.0.0.1', 3333);

// const message = new Message('/address');
// message.append('testing');
// message.append('testing');
// message.append(123);

// client.send(message, (err) => {
//   if (err) {
//     console.error(new Error(err));
//   }
//   client.close();
// });
var oscClient = new osc.Client('127.0.0.1', 3333);
oscClient.send('/sms', 'hello?');
console.log('sent maybe');
// oscClient.close();

// or
// const msg = new Message('/address', 1, 2, 3);
// client.send(msg);