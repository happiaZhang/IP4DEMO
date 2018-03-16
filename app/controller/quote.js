module.exports = app => {
  return class QuoteController extends app.Controller {
    async action() {
      const {ctx} = this;
      const search = ctx.request.search;
      const method = ctx.method;
      const data = ctx.request.body;
      const srvName = ctx.params[0];
      ctx.body = await ctx.service.quote[srvName]({
        search,
        method,
        data
      });
    }
  };
};
