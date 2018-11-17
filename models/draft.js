const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// create a schema
const draftSchema = new Schema({
    tourneyName: String,
    completed: Boolean,
    golfers: [{
	    name: String,
	    odds: Number,
	    team: String
    }],
    rosterSize: Number,
    draftOrder: [String]
});
draftSchema.statics.findLatest = function (cb) {
	//change find to get latest instead of type
  return this.findOne({},cb);
}
//draftSchema.plugin(autoIncrement.plugin, { model: 'Draft', field: 'draftId' });
module.exports = mongoose.model('Draft', draftSchema);
