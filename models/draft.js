const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema
const draftSchema = new Schema({
    draftId: Number,
    tourneyName: String,
    completed: Boolean,
    golfers: [{
	    name: String,
	    odds: Number,
	    team: String
    }]
    rosterSize: Number
});
module.exports = mongoose.model('Draft', draftSchema);
