module.exports = {
  redis: { host: '172.31.15.13', pass: '123456', db: 5 },
  wuhanEndpoint: 'http://localhost:8103',
  chongqingEndpoint: 'https://www.chembnb.xyz/group-buying/api/quotation/groupbuying/product?productCode=rutile-titanium-dioxide-r818',
  subdomain: '/group-buying',
  okchemEndpoint: 'https://api.okchem.com',
  excludedProductCodes: {
    'rutile-titanium-dioxide-r818-001': 'https://www.chembnb.com/group-buying/offers/rutile-titanium-dioxide-001',
  },
  domain: 'http://www.prechembnb.com',
}
