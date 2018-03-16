const querystring = require('querystring');

module.exports = {
  getReqParamObj() {
    const qs = this.request.querystring;
    return {
      query: querystring.parse(qs),
      body: this.request.body
    };
  }
};
