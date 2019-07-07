'use strict';

/**
 * Funciton registered on 'Origin Request' CloudFront Event
 */
exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const isBr = headers['accept-encoding'] && headers['accept-encoding'][0].value.includes("br");
  const isGzip = headers['accept-encoding'] && headers['accept-encoding'][0].value.includes("gzip");
  const gzipPath = '/gzip';
  const brPath = '/br';

  /**
  * Update request path based on custom header
  */ 
  if(isBr) {
    request.uri = brPath + request.uri
  } else if(isGzip) {
    request.uri = gzipPath + request.uri
  }
  console.log('isBR, isGzip-->', isBr, isGzip)
  console.log('request.url -->', request.uri);
  console.log('headers string-->', JSON.stringify(headers))
  callback(null, request);
};
