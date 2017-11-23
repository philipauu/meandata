var router = require('express').Router();
var EMPLOYEECLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
    console.log('doing homepage');
    res.render('index');
}

//-------------------------------------------------
router.get('/api/v4/read', do_read);
router.post('/api/v4/create', do_create);
router.put('/api/v4/update', do_update);
router.delete('/api/v4/delete/:_id', do_delete);
//-------------------------------------------------

function do_read(req, res) {
    console.log('reading data');

    EMPLOYEECLASS.find()
        .then(function (results) {
            console.log(results);
            res.json(results);
        });
}

function do_create(req, res) {
    console.log('creating employee');
    console.log(req.body);

    var data = {
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        avatar: req.body.avatar
    }

    var employee = new EMPLOYEECLASS(data);
    employee.save().then(function (result) {
        console.log(result);
        res.json({
            message: 'backend saved'
        });
    });
}

function do_update(req, res) {
    console.log('updating employee');
    console.log(req.body);
    var update = {
        $set: {
            _id: req.body._id,
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            avatar: req.body.avatar
        }
    };
    EMPLOYEECLASS.findByIdAndUpdate(req.body._id, update)
        .then(function (result) {
            console.log(result);
            res.json({
                message: 'backend updated '
            });
        });
}

function do_delete(req, res) {
    console.log('deleting employee');
    console.log(req.params._id);

    EMPLOYEECLASS.findByIdAndRemove(req.params._id)
        .then(function (result) {
            console.log(result);
            res.json({
                message: 'backend deleted'
            });
        });
}