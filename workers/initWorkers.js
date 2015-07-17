var express = require('express'),
  AWS = require('aws-sdk'),
  partials = require('express-partials'),
  port = 8000,
  key = process.env.AWS_SPAWNER_KEY,
  sec = process.env.AWS_SPAWNER_SECRET,
  versionNum = 1,
  appName = 'sotgWorker' + versionNum,
  environmentNum = 1,
  environmentName = 'workerEnvironment' + environmentNum;

var elasticbeanstalk = new AWS.ElasticBeanstalk({accessKeyId: key, 
  secretAccessKey: sec, region: 'us-west-2'});

var params = {
  ApplicationName: appName,
  Description: 'Initialize Worker',
  AutoCreateApplication: true,
  VersionLabel: '1.0',
  SourceBundle: {
      S3Bucket: 'S3Bucket_name',
      S3Key: 'Zipfile'
  }
};

var params2 = {
  ApplicationName: appName, /* required */
  EnvironmentName: environmentName,
  VersionLabel: '1.0',
  SolutionStackName: '64bit Amazon Linux 2015.03 v1.4.4 running Node.js'
};


var testEb = function(){
    elasticbeanstalk.createApplicationVersion(params, function(err, data) {
    if (err){
    console.log(err, err.stack);
    } else {
      console.log(data);
      elasticbeanstalk.createEnvironment(params2, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
          //increment version and environment to enable more workers to spawn
          versionNum++;
          environmentNum++;
        }           
      });
    }
  });
};

var app = express();
app.use(partials());
app.use(express.bodyParser());
//get request for testing purposes
app.get('/test', testEb);
app.listen(port);
