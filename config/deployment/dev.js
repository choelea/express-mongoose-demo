module.exports = {
  redis: { host: '192.168.1.80', pass: '123456', db: 5 },
  wuhanEndpoint: 'http://192.168.1.97:8103',
  chongqingEndpoint: 'http://120.76.128.139:7810/quotation/groupbuying/product?productCode=rutile-titanium-dioxide-r818',
  subdomain: '/group-buying',
  okchemEndpoint: 'https://api.okchem.com',
  excludedProductCodes: {
    'rutile-titanium-dioxide-r818-001': '/group-buying/offers/rutile-titanium-dioxide-r818-001',
  },
  domain: 'http://www.devchembnb.com',
}
