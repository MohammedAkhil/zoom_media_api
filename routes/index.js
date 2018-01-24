var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { video: 'Express', audio: 's' });
});


/* GET home page. */
router.post('/recordings', function(req, res, next) {
    // var meeting_id = req.body.id;
    var status = req.body.status;
    var type = req.body.type;

    if (type === 'RECORDING_MEETING_COMPLETED') {
        var files = req.body.content.recording_files;
        console.log(files);
        var mp4 = files[0].file_path;
        var m4a = files[1].file_path;
        console.log(mp4);
        res.render('index', {video: mp4, audio: m4a})
    }
    console.log(status);
    res.sendStatus(200);
});

module.exports = router;
