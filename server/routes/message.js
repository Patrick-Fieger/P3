var mongoose = require("mongoose");
var uuid = require('node-uuid'),
    formidable = require('formidable'),
    util = require('util')
    fs = require('fs-extra');
var User = mongoose.model('user');
// User.update({email:"a@a.de"}, { $set: { messages: [] }}, function(err, affected){
//     console.log('affected: ', affected);
// });
var positions = new Array();
var ids = new Array();
var messages = new Array();
var distances = new Array();
var smallestIDs = new Array();
exports.uploadPhoto = function(req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'binary';
    form.addListener('end', function() {
        var name = this.openedFiles[0].name
        var newfilename = uuid.v4() + name
        var temp_path = this.openedFiles[0].path;
        var new_location = '../html/uploads/';
        fs.copy(temp_path, new_location + newfilename, function(err) {
            if (err) {
                console.error(err);
            } else {
                console.log('saved: ' + newfilename)
                res.send(newfilename).status(200).end();
            }
        });
    });
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err);
        }
    });
}
exports.getMessageById = function(req, res, next) {
    var id_ = req.body;
    User.find({}, {
        _id: 0,
        messages: {
            $elemMatch: {
                id: id_.id
            }
        }
    }, function(err, messages) {
        if (err) {
            console.log(err);
        }
        if (messages) {
            res.status(200).send(messages[0].messages[0]).end();
        }
    });
}
exports.getMessageByNearest = function(req, res, next) {
    var latlong = req.body;
    positions = [];
    ids = [];
    messages = [];
    distances = [];
    original = [];
    smallestIDs = [];
    User.find({}, 'messages', function(err, docs) {
        for (var i = 0; i < docs.length; i++) {
            for (var k = 0; k < docs[i].messages.length; k++) {
                positions.push(docs[i].messages[k].position);
                ids.push(docs[i].messages[k].id);
                messages.push(docs[i].messages[k]);
            };
        };
        for (var i = 0; i < positions.length; i++) {
            positions[i] = new LatLon(positions[i][0], positions[i][1]);
        }
        for (var i = 0; i < positions.length; i++) {
            distances.push(parseFloat(distanceTo(latlong.pos, positions[i])));
            original.push(parseFloat(distanceTo(latlong.pos, positions[i])));
        };
        
        original.sort();

        for (var i = 0; i < 3; i++) {
            smallestIDs.push(ids[distances.indexOf(original[i])])
        };
        res.status(200).send(smallestIDs).end();
    });
}

function LatLon(lat, lon, rad) {
    if (typeof(rad) == 'undefined') rad = 6371;
    this._lat = typeof(lat) == 'number' ? lat : typeof(lat) == 'string' && lat.trim() != '' ? +lat : NaN;
    this._lon = typeof(lon) == 'number' ? lon : typeof(lon) == 'string' && lon.trim() != '' ? +lon : NaN;
    this._radius = typeof(rad) == 'number' ? rad : typeof(rad) == 'string' && trim(lon) != '' ? +rad : NaN;
}

function distanceTo(actuall, point) {
    var precision = 4;
    var R = actuall._radius;
    var lat1 = actuall._lat.toRad(),
        lon1 = actuall._lon.toRad();
    var lat2 = point._lat.toRad(),
        lon2 = point._lon.toRad();
    var dLat = lat2 - lat1;
    var dLon = lon2 - lon1;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return toPrecisionFixed(d, precision);
}

function toPrecisionFixed(d, precision) {
    var n = d.toPrecision(precision);
    n = n.replace(/(.+)e\+(.+)/, function(n, sig, exp) {
        sig = sig.replace(/\./, '');
        l = sig.length - 1;
        while (exp-- > l) sig = sig + '0';
        return sig;
    });
    n = n.replace(/(.+)e-(.+)/, function(n, sig, exp) {
        sig = sig.replace(/\./, '');
        while (exp-- > 1) sig = '0' + sig;
        return '0.' + sig;
    });
    return n;
}

if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

exports.getMessageByLocation = function(req, res){
    var d = req.query.position;

    for (var i = 0; i < d.length; i++) {
        d[i] = parseFloat(d[i]);
    };

    User.find({}, {
    _id: 0,
    messages: {
        $elemMatch: {
            position: d
        }
    }
    }, function(err, messages) {
        if (err) {
            console.log(err);
        }
        if (messages) {
            res.status(200).send(messages[0].messages).end();
        }
    });
}

exports.isTimelineAvailable = function(req, res){
    var d = req.query.position;

    for (var i = 0; i < d.length; i++) {
        d[i] = parseFloat(d[i]);
    };

    User.find({}, {
    _id: 0,
    messages: {
        $elemMatch: {
            position: d
        }
    }
    }, function(err, messages) {
        if (err) {
            console.log(err);
        }
        if (messages) {
            res.status(200).send(messages[0].messages).end();
        }
    });
}



exports.saveMessage = function(req, res) {
    var d = req.body;
    var email = d.email;
    delete(d.email);
    d.id = uuid.v4();
    User.findOne({
        email: email
    }, function(err, user) {
        user.messages.push(d)
        user.save(function(err) {
            if (err) res.status(400).end();
            res.status(200).end();
        });
    });
};