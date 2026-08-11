const https = require('https');
https.get('https://successinc.com.np/mr-sudeep-basnet-trainer-profile/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src="([^"]+)"/g);
    if (matches) {
      console.log(matches.map(m => m.match(/src="([^"]+)"/)[1]).filter(url => url.includes('wp-content')).join('\n'));
    }
  });
});
