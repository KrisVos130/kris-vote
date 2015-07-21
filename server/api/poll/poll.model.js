'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollSchema = new Schema({
    _id: {type: Number, unique: true},
    user: {type: Schema.ObjectId, ref: 'users'},
    question: { type: String, required: true},
    poll_options: { type: Schema.Types.Mixed }, // we will leave this unvalidated for now will add validation later :)
    results: { type: Schema.Types.Mixed }  // we will leave this unvalidated for now will add validation later :) - you will have to define a more complex validation function for it
});

// Validation for question
PollSchema.path('question').validate(function (question) {
  return question && question.length;
}, 'Question cannot be blank');

// Load method
/**PollSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb); // what data you need for the users
};*/

module.exports = mongoose.model('Poll', PollSchema);