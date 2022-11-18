var express = require('express');
var router = express.Router();
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var Message;
var osc = require('node-osc');
const { DateTime } = require("luxon");
const { MarsDate } = require("mars-date-utils-master");

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log("Request:");
  console.log(req.header);
  console.log("Request Body: ");
  console.log(req.body);
  var time = Datetime.now();
  var timeString = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  const marsDate = new MarsDate(time);
  const marsTime = marsDate.getMST();
  Message = req.body.Body;
  const twiml = new MessagingResponse();

  twiml.message('Message received at ' + timeString + '.  Your message is now en route to Mars.  The local time on Mars is currently: ' + marsTime + " MST");

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

  var oscClient = new osc.Client('127.0.0.1', 3333);
  oscClient.send('/sms', req.body.Body);
});


router.get('/', function(req, res, next) {

  res.send("Nice try, but GET /sms is not supported by this example. Try using POST /sms for testing Twilio Webhook requests.")

});


module.exports = router;
