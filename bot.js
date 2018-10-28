const HTTPS = require('https');
const botid = process.env.BOT_ID;

function respond(req){
  console.log("responding");
  console.log(req.text);
  console.log(req.name);
  return "i respond";
}

exports.respond = respond;
