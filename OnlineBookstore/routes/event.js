const express = require('express');
const router = express.Router();
const validator = require('validator');
const mongoose = require('mongoose');
const Event = require('../models/Event.js');

const passport = require('passport');
require('../config/passport')(passport);

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};



router.get('/', function(req, res, next) {
    Event.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    }).sort({eventDate: -1});
  });

   /* Get Events By Category */
 router.get('/evcategory/:name', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
  Event.find({category:req.params.name} , req.body, function(err, ev) {
    if (err)return next(err);
    res.json(ev);
  }).sort({eventDate: -1});
} else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Event.findById(req.params.id, function (err, events) {
      if (err) return next(err);
      res.json(events);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Event.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Event.findByIdAndUpdate(req.params.id,req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Event.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});


module.exports = router;