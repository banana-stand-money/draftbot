const HTTPS = require('https');
const botid = '3afd13e78e544d0cf3229add15';
const axios = require('axios');
//const mongoose = require('mongoose');
//const Draft = mongoose.model('Draft');
const Draft = require('./models/draft');

//TODO: create endpoint class for posting to groupme

//TODO: botid and URL to config/app.json
async function respond(req){

  console.log ('detected msg');
  keywordRegex = /^\#(\w+)\s(.*)/;
	const MsgLines = req.text.split("\n"); 
  if (req.text && keywordRegex.test(MsgLines[0]) && req.name != 'draftbot'){
  const cmd =  MsgLines[0].replace(keywordRegex, '$1');
  const txt =  MsgLines[0].replace(keywordRegex, '$2');


  switch(cmd){
	case "STARTDRAFT": {
		//Create Draft Record
		console.log('IN start draft');
  	const draft = new Draft({
		rosterSize: '6',
		tourneyName: 'Draft ' + txt,
		completed: 'false'
  	});
  	draft.save();

	break;
}
	case "ADDGOLFERS": {
		//Add golfers where not exists
		console.log("In ADDGOLFERS");
		//txt.split("\n").forEach(x => console.log("split:" + x));
		MsgLines.forEach(x => console.log("split:" + x));
		
		const draftName = await Draft.findOne().sort({ _id: -1 }).exec(function(err, doc) {
			if (err){
				console.log('Error:' + err);
			}
			console.log("updating draft:" + doc.tourneyName);
			Draft.findOneAndUpdate(
				{ tourneyName: doc.tourneyName},
				{$push: { golfers: {name: "Static Test", odds: "500"}
				
			}},
			function (err, success){
			if (err){
			console.log(err);
			}
				else{
				console.log(success);
				}
			});
			/*
			MsgLines.forEach((x) => {
				console.log("upserting:" + x)
				await doc.golfers.push(x);
				doc.save();
			});
			*/
			
		
		});
		break;
	}
	case "DRAFT": {
		//Check Golfer not drafted yet
		break;
	}
	default: {
		console.log("unrecognized command:'" + cmd + "'");
		break;
	}

  }
  const URL = 'https://api.groupme.com/v3/bots/post';
  const data = {"bot_id": botid,
	        "text": cmd + '->"' + txt + '"'       
  }
  axios({
	  method: 'post',
	  url: URL,
	  data
  })
	.catch(err=>console.log(err));
  

  }
  return 0;
}

exports.respond = respond;
