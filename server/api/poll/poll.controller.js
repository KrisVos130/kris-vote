'use strict';

var Poll = require('./poll.model');
var mongoose = require('mongoose');
var Auth = require("../../auth/auth.service.js")

var validationError = function(res, err) {
  return res.json(422, err);
};

var Counter = mongoose.model('Counters',
    mongoose.Schema({
        _id: String,
        seq: Number
    })
);

exports.create = function(req, res, next){
  Counter.find({_id: "poll_id"}, function(err, counter){
    var newPoll = new Poll(req.body);
    newPoll._id = counter[0]._doc.seq + 1;
    newPoll.save(function(err, poll){
      if (err){ 
        return validationError(res, err); 
      }
      var newCounter = {seq: counter[0]._doc.seq + 1};
      Counter.update({_id: "poll_id"}, newCounter, {upsert: true}, function(err){
        res.end(newPoll._id + "");
      });
    });
  });
};

exports.show = function(req, res, next){
  var id = parseInt(req.params.id);
  if (typeof id === 'number' && (id > 0)) {
    Poll.find({_id: id}, function(err, poll){
      if (err);
      res.end(JSON.stringify(poll));
    });
  } else {
    res.status(404).send("Not found");
  }
};

exports.answer = function(req, res, next){
  var id = parseInt(req.params.id);
  if (typeof id === 'number') {
    Poll.findOne({_id: id}, function(err, poll) {
      if (err) {
        res.end();
      }
      if (req.body.user !== null && req.body.poll_option > -1 && req.body.poll_option < poll.poll_options.length) {
        poll.results.push({user: req.body.user, poll_option: req.body.poll_option});
        poll.markModified('results');
        poll.save(function(err, updatedPoll){
          if (err) {
            res.end();
          } else {
            res.end(JSON.stringify(updatedPoll));
          }
        });
      } else {
        res.end();
      }
    });
  } else {
    res.status(404).send("Not found");
  }
};

exports.user = function(req, res, next){
  var user = req.params.user;
  if (typeof user === 'string') {
    Poll.find({user: user}, function(err, poll) {
      if (err) {
        res.end([]);
      } else {
        res.end(JSON.stringify(poll));
      }
    });
  } else {
    res.status(404).send("Not found");
  }
};

exports.remove = function(req, res, next){
  var id = parseInt(req.params.id);
  if (typeof id === 'number') {
    Poll.find({_id: id}).remove().exec();
    res.end("Success!");
  } else {
    res.status(404).send("Not found");
  }
};