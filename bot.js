const HTTPS = require('https');
const botid = '3afd13e78e544d0cf3229add15';
const axios = require('axios');
const Draft = require('./models/draft');
//TODO: create endpoint class for posting to groupme

//TODO: botid and URL to config/app.json
function respond(req){

  keywordRegex = /^\#(\w+)\s(.*)/;
  if (req.text && keywordRegex.test(req.text) && req.name != 'draftbot'){
  const cmd =  req.text.replace(keywordRegex, '$1');
  const txt =  req.text.replace(keywordRegex, '$2');
// const fixedText = req.text.replace('#DRAFT ','');
//  const msg = req.name + " drafted " + fixedText;


  switch(cmd){
	case "STARTDRAFT": {
		//Create Draft Record
		break;
	}
	case "ADDGOLFERS": {
		//Add golfers where not exists
		break;
	}
	case "DRAFT": {
		//Check Golfer not drafted yet
		break;
	}
	default: {
		break;
	}

  }
  const URL = 'https://api.groupme.com/v3/bots/post';
  const data = {"bot_id": botid,
	        "text": cmd + '->' + txt       
  }
  axios({
	  method: 'post',
	  url: URL,
	  data
  })
	.catch(err=>console.log(err));
  

//  const draft = new Draft({
//	draftId: '1',
//	tourneyName: 'Draft ' + fixedText,
//	completed: 'true'
//  });
//  return draft.save();
  }
  return 0;
}

exports.respond = respond;
