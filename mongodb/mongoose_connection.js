var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = 'mongodb://localhost:27500/people';
mongoose.connect(url,{useMongoClient: true});

var schema = {
    name: String,
    gender: String,
    email: String,
    avatar: String
}

var doc_structure = new mongoose.Schema(schema);

var EMPLOYEECLASS = mongoose.model('employees', doc_structure);

module.exports = EMPLOYEECLASS;