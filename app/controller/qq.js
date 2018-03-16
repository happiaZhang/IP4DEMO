module.exports = app => {
  return class QQController extends app.Controller {
    async ticket() {
      const {ctx} = this;
      ctx.logger.info(ctx.getReqParamObj());
      ctx.body = 'success';
    }

    async receive() {
      const {ctx} = this;
      ctx.logger.info(ctx.getReqParamObj());
      ctx.body = 'success';
    }
  };
};
