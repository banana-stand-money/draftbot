const HTTPS = require('https');
const botid = '3afd13e78e544d0cf3229add15';
const axios = require('axios');
//TODO: botid and URL to config/app.json
function respond(req){

  keywordRegex = /\#DRAFT/;
  if (req.text && keywordRegex.test(req.text) && req.name != 'draftbot'){

	  const fixedText = req.text.replace('#DRAFT ','');
	  const msg = req.name + " drafted " + fixedText;
  const URL = 'https://api.groupme.com/v3/bots/post';
  const data = {"bot_id": botid,
	        "text": msg       
  }
  return axios({
	  method: 'post',
	  url: URL,
	  data
  })
	.catch(err=>console.log(err));
  }
  return 0;
}

exports.respond = respond;
