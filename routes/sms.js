var express = require('express');
var router = express.Router();
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var Message;
var osc = require('node-osc');
const { DateTime, Duration } = require("luxon");
const { MarsDate } = require("mars-date-utils");
const { MediaInstance } = require('twilio/lib/rest/api/v2010/account/message/media');
//import { MarsDate } from "mars-date-utils";

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log("Request:");
  console.log(req.header);
  console.log("Request Body: ");
  console.log(req.body.Body);
  var dt = DateTime.now();
  var timeString = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS);
  var dateString = DateTime.now().toLocaleString(DateTime.DATE_MED);
  const currentTime = new Date(dt.ts);
  var marsTime = new MarsDate(currentTime);
  var marsMST = marsTime.getMST();
  var lightDly = marsTime.getLightDelay();
  var dlyMins = Math.floor(lightDly / 60);
  var dlySec = Math.round(lightDly % 60);
  Message = req.body.Body;
  const twiml = new MessagingResponse();

  twiml.message('Thank you for using Mars Messaging Service.  Your message was received at ' + timeString + ', ' + dateString + ' and is now en route to Mars.  There is a transmission delay of ' + dlyMins + ' minutes and ' + dlySec + ' seconds.  Current Coordinated Mars Time is: ' + marsMST + ' MTC.');
  var msg1 = ('Message received: ' + timeString + ', ' + dateString);
  var msg2 = ('Current transmission delay: ' + dlyMins + ' min, ' + dlySec + ' sec');
  var msg3 = ('Message: ' + req.body.Body);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

  var oscClient = new osc.Client('127.0.0.1', 3333);
  oscClient.send('/sms', req.body.Body);
  oscClient.send('/dlyMins', dlyMins);
  oscClient.send('/dlySec', dlySec);
  oscClient.send('/delay', lightDly);
  oscClient.send('/msg1', msg1);
  oscClient.send('/msg2', msg2);
  oscClient.send('/msg3', msg3);
  oscClient.send('/msg', msg1+'\n'+msg2+'\n'+msg3);
});


router.get('/', function(req, res, next) {

  res.send("Nice try, but GET /sms is not supported by this example. Try using POST /sms for testing Twilio Webhook requests.")

});


module.exports = router;