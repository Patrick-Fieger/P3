var mongoose = require("mongoose");
var uuid = require('node-uuid'),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra');

var User = mongoose.model('user');


User.find().remove().exec();


exports.uploadPhoto = function(req, res) {
	var form = new formidable.IncomingForm();
  	// form.uploadDir = '../html/uploads/';
  	form.encoding = 'binary';
	
  	form.addListener('end', function() {
  	  var name = this.openedFiles[0].name
  	  res.send(this.openedFiles[0].name).status(200).end();

  	    var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = '../html/uploads/';
 
        fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log('saved: '+name)
            }
        });

  	});
	
  	form.parse(req, function(err, fields, files) {
  	  if (err) {
  	    console.log(err);
  	  }
  	});
}

exports.saveMessage = function(req, res) {
	var d = req.body;
	var email = d.email;
	delete(d.email);
	d.id = uuid.v4();

	User.findOne({email: email}, function(err, user) {
		user.messages.push(d)
		user.save(function (err) {
    	if (err) res.status(400).end();
    		res.status(200).end();
  		});
	});
};