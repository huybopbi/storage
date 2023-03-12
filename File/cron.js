(async function mew() {
  const https = require('https');
  try {
    var response = await new Promise(resolve => {
      var request = https.request({
        hostname: 'pay.vpnfast.shop', // hostname không có http://
        path: 'cron_bank.php', // mọi thứ sau hostname: /api/v1/...
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
    setTimeout(mew, 1000 * 10); // sau 1 phút thì tiếp tục lại lấy dữ liệu, 60 là 1 phút
  }
})();