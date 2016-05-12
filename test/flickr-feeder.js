var flickrFeeder = require('../flickr-feeder.js'),
    nock = require('nock'),
    expect = require('expect.js');

describe("flickrFeeder", function() {
  describe("#getFlickrJSON", function () {

    // verify that the getFlickrJSON method exists
    it("exists as a public method on flickrFeeder", function () {
      expect(typeof flickrFeeder.getFlickrJSON).to.eql('function');
    });

    // use nock to verify that the getFlickrJSON method calls the correct URL
    it("makes the correct http call to Flickr's API based on the parameters it's passed", function(done) {
      nock('http://api.flickr.com')
        .get('/services/feeds/photos_public.gne?format=json&id=someFlickrID')
        .reply(200, {some_key:'some_value'});

      flickrFeeder.getFlickrJSON({id: 'someFlickrID'}, function (data) {
        expect(JSON.parse(data).some_key).to.eql('some_value');
        done();
      });
    });

    // an example of a test that fails
    xit("makes the correct http call to Flickr's API based on the parameters it's passed", function(done) {
      nock('http://api.flickr.com')
        .get('/some_url_that_will_not_get_called')
        .reply(200, {'some_key':'some_value'});

      flickrFeeder.getFlickrJSON({id: 'someFlickrID'}, function (data) {
        expect(JSON.parse(data).some_key).to.eql('some_value');
        done();
      });
    });
  });
});
