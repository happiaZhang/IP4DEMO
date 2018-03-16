const querystring = require('querystring');
const QuoteEngine = require('./quoteEngine');

module.exports = app => {
  class Quote extends app.Service {
    async list(opts) {
      const {search} = opts;
      const filter = querystring.parse(search.substr(1));
      const quoteEngine = new QuoteEngine();
      const content = quoteEngine.parse(filter);
      return {
        success: true,
        content,
        errMessage: null
      };
    }

    async receive() {
      const quoteEngine = new QuoteEngine();
      const content = quoteEngine.createOne();
      return {
        success: true,
        content,
        errMessage: null
      };
    }

    async mine() {
      const quoteEngine = new QuoteEngine();
      const content = quoteEngine.getMine();
      return {
        success: true,
        content,
        errMessage: null
      };
    }

    async bond() {
      const quoteEngine = new QuoteEngine();
      const content = quoteEngine.getBond();
      return {
        success: true,
        content,
        errMessage: null
      };
    }

    async current(opts) {
      const {search} = opts;
      const qs = querystring.parse(search.substr(1));
      const quoteEngine = new QuoteEngine();
      const content = quoteEngine.getCurrent(qs);
      return {
        success: true,
        content,
        errMessage: null
      };
    }

    async history(opts) {
      const {search} = opts;
      const qs = querystring.parse(search.substr(1));
      const quoteEngine = new QuoteEngine();
      const content = quoteEngine.getHistory(qs);
      return {
        success: true,
        content,
        errMessage: null
      };
    }

    async intention() {
      const quoteEngine = new QuoteEngine();
      const content = quoteEngine.getIntention();
      return {
        success: true,
        content,
        errMessage: null
      };
    }

    async query(opts) {
      const {search} = opts;
      const qs = querystring.parse(search.substr(1));
      const quoteEngine = new QuoteEngine();
      const content = quoteEngine.getQuery(qs);
      return {
        success: true,
        content,
        errMessage: null
      };
    }
  }
  return Quote;
};
