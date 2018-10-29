const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema
const draftSchema = new Schema({
    draftId: Number,
    tourneyName: String,
    completed: Boolean
});
module.exports = mongoose.model('Draft', draftSchema);
