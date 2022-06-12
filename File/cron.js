(async function mew() {
  const https = require('https');
  try {
    var response = await new Promise(resolve => {
      var request = https.request({
        hostname: 'momo.wibu4.fun', // hostname không có http://
        path: '/controller/momo/api.php?act=getHistories&type=1', // mọi thứ sau hostname: /api/v1/...
        method: 'GET',
        timeout: 10000,
        headers: {
          'User-Agent': 'MeewMeew',
          'Accept': 'application/json',
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        }).on('end', () => {
          resolve(JSON.parse(data));
        }).on('error', (error) => {
          resolve(error);
        });
      });
      request.on('error', (error) => {
        resolve(error);
      }).end();
    })
    console.log(response);
  } finally {
    setTimeout(mew, 1000 * 30); // sau 1 phút thì tiếp tục lại lấy dữ liệu, 60 là 1 phút
  }
})();
