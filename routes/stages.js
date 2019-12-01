const router = require('express').Router();
let Stage = require('../models/stage.model');

router.route('/').get((req, res) => {
  const pagination = req.query.pagination
    ? parseInt(req.query.pagination)
    : 10;
  const page = req.query.page
    ? parseInt(req.query.page)
    : 1;
  Stage.find()
    .skip((page - 1) * pagination)
    .limit(pagination)
    .then(stages => res.json(stages))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/stage/:id').get((req, res) => {
  Stage.find({ "onlineData.courseID": req.params.id })
    .then(stage => res.json(stage))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/profile/:creator').get((req, res) => {
  Stage.find({ "onlineData.courseCreator": req.params.creator })
    .then(stages => res.json(stages))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/uploadStage').post((req, res) => {
  const isPublished = req.body.isPublished;
  const courseCreator = req.body.onlineData.courseCreator;
  const courseID = req.body.onlineData.courseID;
  const platform = req.body.onlineData.platform;
  const playAttempts = Number(req.body.onlineData.playAttempts);
  const playCompletions = Number(req.body.onlineData.playCompletions);
  const likes = Number(req.body.onlineData.likes);
  const courseData = req.body.courseData;
  const onlineData = {
    "courseCreator": courseCreator,
    "courseID": courseID,
    "platform": platform,
    "playAttempts": playAttempts,
    "playCompletions": playCompletions,
    "likes": likes
  }

  const newStage = new Stage({
    isPublished,
    onlineData,
    courseData
  });

  newStage.save()
    .then(() => res.json('Stage Created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/publishStage').put((req, res) => {
  Stage.find({ "onlineData.courseID": req.params.id })
    .then(stage => {
      stage[0].isPublished = req.body.isPublished;

      stage[0].save()
        .then(() => res.json('Stage PUblished'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/updateStats/:id').put((req, res) => {
  Stage.find({ "onlineData.courseID": req.params.id })
    .then(stage => {
      stage[0].onlineData = {
        "courseCreator": req.body.onlineData.courseCreator,
        "courseID": req.body.onlineData.courseID,
        "platform": req.body.onlineData.platform,
        "playAttempts": Number(req.body.onlineData.playAttempts),
        "playCompletions": Number(req.body.onlineData.playCompletions),
        "likes": Number(req.body.onlineData.likes)
      };

      stage[0].save()
        .then(() => res.json('Stage updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/changePlatform/:id').put((req, res) => {
  Stage.find({ "onlineData.courseID": req.params.id })
    .then(stage => {
      stage[0].onlineData.platform = req.body.platform;

      stage[0].save()
        .then(() => res.json('Changed Platform'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/attemptStage/:id').put((req, res) => {
  Stage.find({ "onlineData.courseID": req.params.id })
    .then(stage => {
      stage[0].onlineData.playAttempts++;

      stage[0].save()
        .then(() => res.json('Attempted stage'))
        .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/completeStage/:id').put((req, res) => {
  Stage.find({ "onlineData.courseID": req.params.id })
    .then(stage => {
      stage[0].onlineData.playCompletions++;

      stage[0].save()
        .then(() => res.json('Completed Stage'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/likeStage/:id').put((req, res) => {
  Stage.find({ "onlineData.courseID": req.params.id })
    .then(stage => {
      stage[0].onlineData.likes++;

      stage[0].save()
        .then(() => res.json('Liked stage'))
        .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/updateStage').put((req, res) => {
  Stage.find({ "onlineData.courseID": req.params.id })
    .then(stage => {
      stage[0].courseData = req.body.courseData;

      stage[0].save()
        .then(() => res.json('Stage updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/deleteStage/:id').delete((req, res) => {
  Stage.remove({ "onlineData.courseID": req.params.id })
    .then(() => res.json('Stage deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
