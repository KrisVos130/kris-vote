'use strict';

var Poll = require('./poll.model');
var mongoose = require('mongoose');

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
    console.log(counter[0]._doc.seq);
    newPoll._id = counter[0]._doc.seq + 1;
    newPoll.save(function(err, poll){
      if (err){ 
        console.log("ERROR! " + err);
        return validationError(res, err); 
      }
      var newCounter = {seq: counter[0]._doc.seq + 1};
      Counter.update({_id: "poll_id"}, newCounter, {upsert: true}, function(err){
        if (err) console.log("ERROR! " + err);
        res.end();
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
      if (req.body.user !== null && req.body.poll_option > 0 && req.body.poll_option < poll.poll_options.length) {
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

/*
Counter.find({_id: "poll_id"}, function(err, counter){
    newPoll._id = counter.seq + 1;
    var newCounter = new Counter({_id: "poll_id", req: counter.seq + 1});
    newCounter.save(function(){
    
    });
});
*/