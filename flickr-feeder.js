var request = require("request")
  , _ = require("underscore");

exports.getFlickrJSON = function(params, callback) {
  var url = "http://api.flickr.com/services/feeds/photos_public.gne";
  var paramsObj = {
    'format': 'json' 
  };

  _.extend(paramsObj, params);

  request(url, {qs: paramsObj}, function (error, response, body) {
    callback(body);
  });
};
