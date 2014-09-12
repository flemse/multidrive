var googleapis = require('googleapis'),
    readline = require('readline');

var CLIENT_ID = '87087494152-aiqrv0845t8ok8eag557m2unka3ciefv.apps.googleusercontent.com',
    CLIENT_SECRET = '9lnXFgHLqGczSGfPRa4fRht8',
    REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob',
    SCOPE = 'https://www.googleapis.com/auth/drive.file';

var auth = new googleapis.OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

googleapis.discover('drive', 'v2').execute(function(err, client) {
  var url = auth.generateAuthUrl({ scope: SCOPE });
  var getAccessToken = function(code) {
    auth.getToken(code, function(err, tokens) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      auth.credentials = tokens;
      upload();
    });
  };
  var upload = function() {
    client.drive.files
      .insert({ title: 'My Document', mimeType: 'text/plain' })
      .withMedia('text/plain', 'Hello World!')
      .withAuthClient(auth).execute(console.log);
  };
  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', getAccessToken);
});
