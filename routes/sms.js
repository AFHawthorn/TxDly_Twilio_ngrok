var express = require('express');
var router = express.Router();
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var Message;
//var osc = require("osc");
const { Client } = require('node-osc');


/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log("Request Headers:");
  console.log(req.headers);
  console.log("Request Body: ");
  console.log(req.body.Body);
  Message = req.body.Body;
  const twiml = new MessagingResponse();

  twiml.message('Your message is now en route to Mars.');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  const oscClient = new Client('localhost', 3333);
  oscClient.send('/sms', req.body.Body);
  oscClient.close();
});

// var oscPort = new osc.WebSocketPort({
//   url: "ws://localhost:5678", // URL to your Web Socket server.
//   metadata: true
// });

router.get('/', function(req, res, next) {

  res.send("Nice try, but GET /sms is not supported by this example. Try using POST /sms for testing Twilio Webhook requests.")

});

// oscPort.open();

module.exports = router;

// oscPort.on("ready", function () {
//   oscPort.send({
//       address: "/msg",
//       args: [
//           {
//               value: Message
//           }
//       ]
//   });
// });
