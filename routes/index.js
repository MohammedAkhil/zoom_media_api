const express = require('express');
const router = express.Router();
const recordingModel = require('./../models/recordings.model');

/* GET home page. */
router.get('/', (req, res, next) => {
  //res.render('index', { video: 'Express', audio: 's' });
});


/* GET home page. */
router.post('/recordings', function(req, res, next) {
    // var meeting_id = req.body.id;
    const status = req.body.status;
    const type = req.body.type;

    if (type === 'RECORDING_MEETING_COMPLETED') {
        const files = req.body.content.recording_files;
        const mp4 = files[0].file_path;
        const m4a = files[1].file_path;
        recordingModel.saveRecordings(
            {
                meeting_id: req.body.content.meeting_number,
                video:mp4,
                audio:m4a
            },
            (err, docs) => {
            if (err) {
                res.sendStatus(400)
            } else {
                console.log(docs);
                res.sendStatus(200)
            }
        });
    }
});

router.get('/find', function(req, res, next) {
    // var meeting_id = req.body.id;
    recordingModel.findRecordings((err, result) => {
        if(err) {
            res.sendStatus(400)
        } else {
            res.sendStatus(200)
        }
    })

});

module.exports = router;
