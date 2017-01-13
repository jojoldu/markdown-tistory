
const fs = require('fs');

const getAccessTokenFromLocal = function(callback) {
  fs.readFile(jsonPath+'token.json', 'utf8', function (err, data) {
      if (err) {
          console.log('There is no access token information \nPlease run markdown-tistory init');
          throw err;
      }

      callback(JSON.parse(data).accessToken);
  });
}
