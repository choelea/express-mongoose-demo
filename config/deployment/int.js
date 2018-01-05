module.exports = {
  redis: { host: 'localhost', pass: '123456', db: 5 },
  wuhanEndpoint: 'http://localhost:8103',
  chongqingEndpoint: 'http://localhost:7810/quotation/groupbuying/product?productCode=rutile-titanium-dioxide-r818',
  subdomain: '/group-buying',
  okchemEndpoint: 'https://api.okchem.com',
  excludedProductCodes: {
    'rutile-titanium-dioxide-r818-001': 'http://cppc.intokchem.com/pages/onGoingDetail/onGoingDetail.html',
  },
  domain: 'http://chembnb.intokchem.com',
}
