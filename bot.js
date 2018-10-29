const HTTPS = require('https');
const botid = '3afd13e78e544d0cf3229add15';
const axios = require('axios');
const Draft = require('./models/draft');


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
  axios({
	  method: 'post',
	  url: URL,
	  data
  })
	.catch(err=>console.log(err));
  

  const draft = new Draft({
	  draftId: '1',
	tourneyName: 'Draft ' + fixedText,
	completed: 'true'
  });
  return draft.save();
  }
  return 0;
}

exports.respond = respond;
