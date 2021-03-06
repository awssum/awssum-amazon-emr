// --------------------------------------------------------------------------------------------------------------------
//
// emr.js - class for AWS Elastic Map Reduce
//
// Copyright (c) 2011, 2012 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------
// requires

// built-ins
var util = require('util');

// dependencies
var _ = require('underscore');

// our own
var awssum = require('awssum');
var amazon = require('awssum-amazon');
var operations = require('./config.js');

// --------------------------------------------------------------------------------------------------------------------
// package variables

var MARK = 'emr: ';

// From: http://docs.amazonwebservices.com/general/latest/gr/rande.html
var endPoint = {};
endPoint[amazon.US_EAST_1]      = "elasticmapreduce.us-east-1.amazonaws.com";
endPoint[amazon.US_WEST_1]      = "elasticmapreduce.us-west-1.amazonaws.com";
endPoint[amazon.US_WEST_2]      = "elasticmapreduce.us-west-2.amazonaws.com";
endPoint[amazon.EU_WEST_1]      = "elasticmapreduce.eu-west-1.amazonaws.com";
endPoint[amazon.AP_SOUTHEAST_1] = "elasticmapreduce.ap-southeast-1.amazonaws.com";
endPoint[amazon.AP_SOUTHEAST_2] = "elasticmapreduce.ap-southeast-2.amazonaws.com";
endPoint[amazon.AP_NORTHEAST_1] = "elasticmapreduce.ap-northeast-1.amazonaws.com";
endPoint[amazon.SA_EAST_1]      = "elasticmapreduce.sa-east-1.amazonaws.com";
endPoint[amazon.US_GOV_WEST_1]  = "elasticmapreduce.us-gov-west-1.amazonaws.com";

var version = '2009-03-31';

// --------------------------------------------------------------------------------------------------------------------
// constructor

var Emr = function(opts) {
    var self = this;

    // call the superclass for initialisation
    Emr.super_.call(this, opts);

    // check the region is valid
    if ( ! endPoint[opts.region] ) {
        throw MARK + "invalid region '" + opts.region + "'";
    }

    return self;
};

// inherit from Amazon
util.inherits(Emr, amazon.AmazonSignatureV2);

// --------------------------------------------------------------------------------------------------------------------
// methods we need to implement from awssum.js/amazon.js

Emr.prototype.host = function() {
    return endPoint[this.region()];
};

Emr.prototype.version = function() {
    return version;
};

// --------------------------------------------------------------------------------------------------------------------
// operations on the service

_.each(operations, function(operation, operationName) {
    Emr.prototype[operationName] = awssum.makeOperation(operation);
});

// --------------------------------------------------------------------------------------------------------------------
// exports

// endpoints
exports.US_EAST_1      = amazon.US_EAST_1;
exports.US_WEST_1      = amazon.US_WEST_1;
exports.US_WEST_2      = amazon.US_WEST_2;
exports.EU_WEST_1      = amazon.EU_WEST_1;
exports.AP_SOUTHEAST_1 = amazon.AP_SOUTHEAST_1;
exports.AP_SOUTHEAST_2 = amazon.AP_SOUTHEAST_2;
exports.AP_NORTHEAST_1 = amazon.AP_NORTHEAST_1;
exports.SA_EAST_1      = amazon.SA_EAST_1;
exports.US_GOV_WEST_1  = amazon.US_GOV_WEST_1;

exports.Emr = Emr;

// --------------------------------------------------------------------------------------------------------------------
